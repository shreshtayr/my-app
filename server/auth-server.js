const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 4000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const COOKIE_NAME = 'auth_sid';
const DEV_ALLOWED_ORIGINS = new Set([
  FRONTEND_ORIGIN,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
]);

const sessions = new Map();

function ensureUsersFile() {
  const dir = path.dirname(USERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: {} }, null, 2), 'utf8');
  }
}

function readUsers() {
  ensureUsersFile();
  try {
    const parsed = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    if (!parsed || typeof parsed !== 'object' || !parsed.users || typeof parsed.users !== 'object') {
      return { users: {} };
    }
    return parsed;
  } catch {
    return { users: {} };
  }
}

function writeUsers(data) {
  ensureUsersFile();
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function hashPassword(password, salt, iterations = 120000) {
  return crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('base64');
}

function verifyPassword(password, record) {
  const candidate = hashPassword(password, record.salt, record.iterations);
  const left = Buffer.from(candidate, 'base64');
  const right = Buffer.from(record.passwordHash, 'base64');
  if (left.length !== right.length) {
    return false;
  }
  return crypto.timingSafeEqual(left, right);
}

function createSession(username) {
  const sid = crypto.randomBytes(32).toString('hex');
  sessions.set(sid, { username, expiresAt: Date.now() + SESSION_TTL_MS });
  return sid;
}

function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [sid, session] of sessions.entries()) {
    if (!session || session.expiresAt <= now) {
      sessions.delete(sid);
    }
  }
}

function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader) {
    return out;
  }
  for (const item of cookieHeader.split(';')) {
    const [key, ...rest] = item.trim().split('=');
    if (!key) {
      continue;
    }
    out[key] = decodeURIComponent(rest.join('='));
  }
  return out;
}

function writeJson(res, statusCode, payload, origin) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin',
  });
  res.end(JSON.stringify(payload));
}

function setSessionCookie(res, sid, origin) {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const cookie = `${COOKIE_NAME}=${encodeURIComponent(sid)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=86400${secureFlag}`;
  res.setHeader('Set-Cookie', cookie);
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');
}

function clearSessionCookie(res, origin) {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const cookie = `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secureFlag}`;
  res.setHeader('Set-Cookie', cookie);
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) {
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function normalizeUsername(value) {
  return String(value || '').trim();
}

function resolveOrigin(req) {
  const requestOrigin = req.headers.origin;
  if (requestOrigin && DEV_ALLOWED_ORIGINS.has(requestOrigin)) {
    return requestOrigin;
  }
  return FRONTEND_ORIGIN;
}

function handleRequest(req, res) {
  cleanupExpiredSessions();
  const origin = resolveOrigin(req);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    });
    res.end();
    return;
  }

  if (req.url === '/api/health' && req.method === 'GET') {
    writeJson(res, 200, { ok: true }, origin);
    return;
  }

  if (req.url === '/api/me' && req.method === 'GET') {
    const cookies = parseCookies(req.headers.cookie || '');
    const sid = cookies[COOKIE_NAME];
    const session = sid ? sessions.get(sid) : null;
    if (!session || session.expiresAt <= Date.now()) {
      if (sid) {
        sessions.delete(sid);
      }
      writeJson(res, 401, { user: null }, origin);
      return;
    }

    writeJson(res, 200, { user: { username: session.username } }, origin);
    return;
  }

  if (req.url === '/api/register' && req.method === 'POST') {
    parseBody(req)
      .then((body) => {
        const username = normalizeUsername(body.username);
        const password = String(body.password || '');
        if (!username) {
          writeJson(res, 400, { error: 'Please choose a username' }, origin);
          return;
        }
        if (password.length < 6) {
          writeJson(res, 400, { error: 'Password must be at least 6 characters' }, origin);
          return;
        }

        const store = readUsers();
        if (store.users[username]) {
          writeJson(res, 409, { error: 'Username already exists' }, origin);
          return;
        }

        const salt = crypto.randomBytes(16).toString('base64');
        const iterations = 120000;
        const passwordHash = hashPassword(password, salt, iterations);
        store.users[username] = { salt, iterations, passwordHash };
        writeUsers(store);

        const sid = createSession(username);
        setSessionCookie(res, sid, origin);
        writeJson(res, 201, { user: { username } }, origin);
      })
      .catch((err) => {
        writeJson(res, 400, { error: err.message || 'Bad request' }, origin);
      });
    return;
  }

  if (req.url === '/api/login' && req.method === 'POST') {
    parseBody(req)
      .then((body) => {
        const username = normalizeUsername(body.username);
        const password = String(body.password || '');
        if (!username || !password) {
          writeJson(res, 400, { error: 'Username and password are required' }, origin);
          return;
        }

        const store = readUsers();
        const record = store.users[username];
        if (!record || !verifyPassword(password, record)) {
          writeJson(res, 401, { error: 'Invalid username or password' }, origin);
          return;
        }

        const sid = createSession(username);
        setSessionCookie(res, sid, origin);
        writeJson(res, 200, { user: { username } }, origin);
      })
      .catch((err) => {
        writeJson(res, 400, { error: err.message || 'Bad request' }, origin);
      });
    return;
  }

  if (req.url === '/api/logout' && req.method === 'POST') {
    const cookies = parseCookies(req.headers.cookie || '');
    const sid = cookies[COOKIE_NAME];
    if (sid) {
      sessions.delete(sid);
    }
    clearSessionCookie(res, origin);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.url === '/api/reset-password' && req.method === 'POST') {
    parseBody(req)
      .then((body) => {
        const username = normalizeUsername(body.username);
        const newPassword = String(body.newPassword || '');
        if (!username || newPassword.length < 6) {
          writeJson(res, 400, { error: 'Invalid username or password' }, origin);
          return;
        }

        const store = readUsers();
        const record = store.users[username];
        if (!record) {
          writeJson(res, 404, { error: 'Username not found' }, origin);
          return;
        }

        const salt = crypto.randomBytes(16).toString('base64');
        const iterations = 120000;
        const passwordHash = hashPassword(newPassword, salt, iterations);
        store.users[username] = { salt, iterations, passwordHash };
        writeUsers(store);
        writeJson(res, 200, { ok: true }, origin);
      })
      .catch((err) => {
        writeJson(res, 400, { error: err.message || 'Bad request' }, origin);
      });
    return;
  }

  writeJson(res, 404, { error: 'Not found' }, origin);
}

function createAuthServer() {
  return http.createServer(handleRequest);
}

if (require.main === module) {
  const server = createAuthServer();
  server.listen(PORT, () => {
    console.log(`Auth API listening on http://localhost:${PORT}`);
  });
}

module.exports = { createAuthServer };

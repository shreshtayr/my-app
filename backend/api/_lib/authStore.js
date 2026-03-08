const crypto = require('crypto');

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const COOKIE_NAME = 'auth_sid';

// NOTE: In-memory store works for demo; use a real DB/session store for production.
const users = new Map();
const sessions = new Map();

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

function createUser(username, password) {
  const salt = crypto.randomBytes(16).toString('base64');
  const iterations = 120000;
  const passwordHash = hashPassword(password, salt, iterations);
  users.set(username, { salt, iterations, passwordHash });
}

function updatePassword(username, newPassword) {
  const salt = crypto.randomBytes(16).toString('base64');
  const iterations = 120000;
  const passwordHash = hashPassword(newPassword, salt, iterations);
  users.set(username, { salt, iterations, passwordHash });
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

function normalizeUsername(value) {
  return String(value || '').trim();
}

function writeJson(res, statusCode, payload) {
  res.status(statusCode).json(payload);
}

function getRequestBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (!req.body) {
    return {};
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

function setSessionCookie(res, sid) {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const cookie = `${COOKIE_NAME}=${encodeURIComponent(sid)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=86400${secureFlag}`;
  res.setHeader('Set-Cookie', cookie);
}

function clearSessionCookie(res) {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const cookie = `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secureFlag}`;
  res.setHeader('Set-Cookie', cookie);
}

function getSessionFromRequest(req) {
  cleanupExpiredSessions();
  const cookies = parseCookies(req.headers.cookie || '');
  const sid = cookies[COOKIE_NAME];
  const session = sid ? sessions.get(sid) : null;
  if (!session || session.expiresAt <= Date.now()) {
    if (sid) {
      sessions.delete(sid);
    }
    return null;
  }
  return { sid, session };
}

module.exports = {
  users,
  verifyPassword,
  createUser,
  updatePassword,
  createSession,
  normalizeUsername,
  writeJson,
  getRequestBody,
  setSessionCookie,
  clearSessionCookie,
  getSessionFromRequest,
  parseCookies,
  sessions,
};

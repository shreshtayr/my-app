const {
  users,
  verifyPassword,
  createSession,
  normalizeUsername,
  writeJson,
  getRequestBody,
  setSessionCookie,
} = require('./_lib/authStore');

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    writeJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const body = getRequestBody(req);
  const username = normalizeUsername(body.username);
  const password = String(body.password || '');

  if (!username || !password) {
    writeJson(res, 400, { error: 'Username and password are required' });
    return;
  }

  const record = users.get(username);
  if (!record || !verifyPassword(password, record)) {
    writeJson(res, 401, { error: 'Invalid username or password' });
    return;
  }

  const sid = createSession(username);
  setSessionCookie(res, sid);
  writeJson(res, 200, { user: { username } });
};

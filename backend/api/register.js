const {
  users,
  createUser,
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

  if (!username) {
    writeJson(res, 400, { error: 'Please choose a username' });
    return;
  }
  if (password.length < 6) {
    writeJson(res, 400, { error: 'Password must be at least 6 characters' });
    return;
  }
  if (users.has(username)) {
    writeJson(res, 409, { error: 'Username already exists' });
    return;
  }

  createUser(username, password);
  const sid = createSession(username);
  setSessionCookie(res, sid);
  writeJson(res, 201, { user: { username } });
};

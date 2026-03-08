const { getSessionFromRequest, writeJson } = require('./_lib/authStore');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    writeJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const auth = getSessionFromRequest(req);
  if (!auth) {
    writeJson(res, 401, { user: null });
    return;
  }

  writeJson(res, 200, { user: { username: auth.session.username } });
};

const { writeJson } = require('./_lib/authStore');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    writeJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  writeJson(res, 200, { ok: true });
};

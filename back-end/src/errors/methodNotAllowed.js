/**
 * Handler if an invalid API call is made to the URL.
 */
function methodNotAllowed(req, res, next) {
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
}

module.exports = methodNotAllowed;

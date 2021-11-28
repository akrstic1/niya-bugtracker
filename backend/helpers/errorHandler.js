function errorHandler(err, req, res, next) {
  // default to 500 server error
  if (err) {
    return res.status(500).json({ message: err.message });
  } else {
    next();
  }
}

module.exports = errorHandler;

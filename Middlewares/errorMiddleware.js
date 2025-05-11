const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;
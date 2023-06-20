module.exports.errorHandler = (err, req, res, next) => {
  /* res.send(err.message); */
  const { statusCode = 500, message } = err;

  res
    .status(statusCode).send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

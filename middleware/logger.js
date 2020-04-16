// higher order function (HOF)
// giving the ability to accept parameters
module.exports = (format) => {
  return (req, res, next) => {
    switch (format) {
      case "short":
        console.log(`${req.method} ${req.url}`);
        break;
      case "long":
      default:
        // custom middleware
        // it will log the request, but will hang and never close
        console.log(
          `${new Date().toISOString()} ${req.ip} ${req.method} ${req.url}`
        );
        next();
    }
  };
};

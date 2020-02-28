const httpStatus = require("http-status");
const { environment } = require("../config/vars");

const generateAPIError = (error, request, response, next) => {
  const errObj = {
    status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: error.message || httpStatus[error.status] || null,
    data: null,
    error: environment !== "production" ? error.stack || null : null,
  };

  return response.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
    ...errObj,
  });
};

module.exports = {
  generateAPIError,
};

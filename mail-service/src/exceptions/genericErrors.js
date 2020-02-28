const APIError = require("../helpers/apiError");
const { UNPROCESSABLE_ENTITY } = require("http-status");

module.exports = {
  missingParametersError: (message = "Missing parameters", stack) =>
    new APIError({
      message: message,
      status: UNPROCESSABLE_ENTITY,
      stack,
    }),
};

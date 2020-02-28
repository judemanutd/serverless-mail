const genericErrors = require("../exceptions/genericErrors");

const validate = async (payload, schema) => {
  try {
    const result = await schema.validateAsync(payload);
    return result;
  } catch (error) {
    throw genericErrors.missingParametersError(error.message, error.stack);
  }
};

module.exports = validate;

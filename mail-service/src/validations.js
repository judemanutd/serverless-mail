const Joi = require("@hapi/joi");

module.exports = {
  sendMailSchema: Joi.object({
    fromEmail: Joi.string().required(),
    destinationEmails: Joi.array()
      .items(Joi.string())
      .required(),
    body: Joi.string().required(),
    shouldStore: Joi.boolean().default(true),
    subject: Joi.string(),
    fromSenderName: Joi.string(),
    isHtml: Joi.boolean(),
    ccEmails: Joi.array().items(Joi.string().required()),
    bccEmails: Joi.array().items(Joi.string().required()),
  }),
};

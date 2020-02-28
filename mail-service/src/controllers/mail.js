const { mailServiceApiKey, mailServicedDomain } = require("../config/vars");
const mailgun = require("mailgun-js")({
  apiKey: mailServiceApiKey,
  domain: mailServicedDomain,
});
const validations = require("../validations");
const mailService = require("../services/mail");
const validate = require("../helpers/validate");

module.exports = {
  handleSendMail: async ({
    fromEmail,
    destinationEmails = [],
    body,
    isHtml = false,
    subject,
    fromSenderName,
    ccEmails = [],
    bccEmails = [],
    shouldStore = true,
  }) => {
    try {
      await validate(
        {
          fromEmail,
          destinationEmails,
          body,
          isHtml,
          subject,
          fromSenderName,
          ccEmails,
          bccEmails,
        },
        validations.sendMailSchema,
      );

      const data = {
        from: fromSenderName ? `${fromSenderName} <${fromEmail}>` : fromEmail,
        to: destinationEmails.join(),
        subject,
      };

      if (isHtml) data.html = body;
      else data.text = body;

      if (ccEmails.length > 0) {
        data.cc = ccEmails.join();
      }

      if (bccEmails.length > 0) {
        data.bcc = bccEmails.join();
      }

      const result = await mailgun.messages().send(data);

      if (shouldStore)
        await mailService.saveEmailTransaction({
          emailSendId: result.id,
          fromEmail,
          destinationEmails,
          body,
          isHtml,
          subject,
          fromSenderName,
          ccEmails,
          bccEmails,
        });

      return true;
    } catch (error) {
      throw error;
    }
  },
};

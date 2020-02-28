const { Emails } = require("../models");

module.exports = {
  saveEmailTransaction: async ({
    emailSendId,
    fromEmail,
    destinationEmails = [],
    body,
    isHtml = false,
    subject,
    fromSenderName,
    ccEmails = [],
    bccEmails = [],
  }) => {
    try {
      const insertObj = {
        emailSendId,
        fromEmail,
        body,
        subject,
        isHtml,
        destinationEmails: destinationEmails.map(email => {
          return {
            email,
          };
        }),
        ccEmails: ccEmails.map(email => {
          return {
            email,
          };
        }),
        bccEmails: bccEmails.map(email => {
          return {
            email,
          };
        }),
        sentAt: new Date(),
      };

      if (fromSenderName) insertObj.fromSenderName = fromSenderName;

      const row = new Emails(insertObj);

      await row.save();

      return true;
    } catch (error) {
      throw error;
    }
  },
};

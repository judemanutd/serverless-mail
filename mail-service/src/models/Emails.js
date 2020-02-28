const { model, Schema } = require("mongoose");

const EmailsSchema = new Schema(
  {
    email: { type: String, required: true },
  },
  {
    _id: false,
  },
);

const EmailSchema = new Schema(
  {
    emailSendId: { type: String, required: true },
    fromEmail: { type: String, required: true },
    body: { type: String, required: true },
    subject: { type: String, required: false },
    isHtml: { type: Boolean, default: false },
    destinationEmails: [EmailsSchema],
    ccEmails: [EmailsSchema],
    bccEmails: [EmailsSchema],
    fromSenderName: { type: String },
    sentAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

const Emails = model("Emails", EmailSchema);

module.exports = Emails;

const app = require("lambda-api")({ version: "v1.0", base: "v1" });
const mailController = require("../controllers/mail");
const { generateAPIError } = require("../middlewares/error");
const { successResponse } = require("../helpers/response");

app.use((req, res, next) => {
  res.cors();
  next();
});

app.post("/mail", async (req, res, next) => {
  try {
    const data = await mailController.handleSendMail(req.body);
    return res.json(successResponse([], "Email queued"));
  } catch (error) {
    throw error;
  }
});

app.options("/*", (req, res) => {
  res.status(200).json({});
});

app.use(generateAPIError);

module.exports = app;

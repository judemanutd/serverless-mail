"use strict";
const mongoose = require("mongoose");
const app = require("./src/routes");
const { mongoDbConnectionUrl } = require("./src/config/vars");

let conn = null;

module.exports.router = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (conn == null) {
    await mongoose.connect(mongoDbConnectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  return await app.run(event, context, callback);
};

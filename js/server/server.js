let express = require("express");
let path = require("path");
let api = require("./api/api");
let config = require("./config/config");
let middleware = require("./middleware/index");

const app = express();
middleware(app);

app.use("/api", api);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ err });
});

module.exports = app;

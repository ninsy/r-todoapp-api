import express from "express";
import path from "path";
import api from "./api/api";
import config from "./config/config";

const app = express();

app.use("/api", api);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ err });
});

export default app;

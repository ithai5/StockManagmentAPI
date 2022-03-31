import express = require("express");
import "dotenv/config";

const port = process.env.APP_PORT || 4200;

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});

app.listen(4200, () => {
  console.log("Application is running on port: ", port);
});

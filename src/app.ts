import express = require("express");
import "dotenv/config";

const port = process.env.APP_PORT || 4200;

const app = express();

const accountRouter = require('./routes/account');

app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});

// ------- Routes -------
app.use('/account', accountRouter);

app.listen(port, () => {
  console.log("Application is running on port: ", port);
});
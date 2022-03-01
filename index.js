const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Running PUCPC on port ");
});

app.listen(port, () => {
  console.log("Listening on ther ", port);
});

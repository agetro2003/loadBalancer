const express = require("express");
const cors = require("cors");
const { Worker } = require("node:worker_threads");
// const cluster = require("node:cluster");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(require("./src/routes/routes"));
app.listen(port, (req, res) => {
  console.log(`Server running on port \u001b[1;32m${port} \u001b[0m`);
  // console.log(`\u001b[1;32m worker` + "\u001b[0m started");
});

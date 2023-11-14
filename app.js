const express = require("express");
const cors = require("cors");
const cluster = require("node:cluster");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < 3; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.use(require("./src/routes/routes"));

  app.listen(port, (req, res) => {
    console.log("worker" + `\u001b[1;31m ${process.pid}` + "\u001b[0m started");
  });
}

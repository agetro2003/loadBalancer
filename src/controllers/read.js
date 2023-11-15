// const client = require("../../gRPC_cli");
const { Worker } = require("node:worker_threads");

function read(req, res) {
  const worker = new Worker("./src/controllers/workerRead.js");

  worker.on("message", (response) => {
    // do something after completion of task
    // console.log("\u001b[1;32mDone");
    res.status(200).json(response);
  });

  worker.on("error", (err) => {
    console.log(err);
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      console.log(`Worker stopped with exit code ${code}`);
    }
  });
}

module.exports = read;

const client = require("../../gRPC_cli");
const { parentPort } = require("worker_threads");

// console.log("Worker executing");
// parentPort.postMessage("Hello from worker");

client.read({}, function (err, response) {
  parentPort.postMessage(response);
  //  console.log(response)
  // res.status(200).json(response);
});

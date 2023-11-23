const clients = require("../../gRPC_cli");
const { parentPort, workerData } = require("worker_threads");

const req = workerData;
// console.log(req);
let client = clients[req];

client.read({}, function (err, response) {
  parentPort.postMessage(response);
  //  console.log(response)
  // res.status(200).json(response);
});

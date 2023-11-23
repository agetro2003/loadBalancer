const { demo_proto, grpc } = require("../../gRPC_cli");
const { parentPort, workerData } = require("worker_threads");

const url = workerData;

const client = new demo_proto.Crud(url, grpc.credentials.createInsecure());

client.read({}, function (err, response) {
  parentPort.postMessage(response);
});

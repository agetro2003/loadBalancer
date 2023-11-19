const PROTO_PATH = __dirname + "/proto/demo.proto";
const parseArgs = require("minimist");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const demo_proto = grpc.loadPackageDefinition(packageDefinition).demo;

const client1 = new demo_proto.Crud(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const client2 = new demo_proto.Crud(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

const client3 = new demo_proto.Crud(
  "localhost:50053",
  grpc.credentials.createInsecure()
);

module.exports = {
  client1,
  client2,
  client3,
};

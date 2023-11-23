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

module.exports = {
  demo_proto,
  grpc
};

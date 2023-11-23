const express = require("express");
const cors = require("cors");
const Service = require("./Service");
const LoadBalancer = require("./loadBalancer");
const fs = require("fs");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const services = [
  new Service("client1"),
  new Service("client2"),
  new Service("client3"),
];

const loadBalancer = new LoadBalancer(services);

app.use((req, res, next) => {
  loadBalancer.processRequest(req, res, next);
});

var counter = 0;
app.use((req, res) => {
  counter++;
  const response = req.response;

  // console.log("Response: ", response);
  const selectedService = loadBalancer.services.find(
    (service) => service.id === req.service
  );

  selectedService.freeCpu = response.freeCPU;
  selectedService.freeRam = response.freeMem;
  selectedService.totalProcesses++;
  selectedService.activeProcesses--;
  selectedService.latency = Date.now() - req.initialTime;

  // Prepare log entry
  const logEntry =
    [
      counter,
      selectedService.id,
      req.initialTime,
      Date.now(),
      selectedService.activeProcesses,
      selectedService.totalProcesses,
      response.table,
    ].join("\t |\t") + "\n";

  // Append log entry to log.txt
  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) throw err;
  });

  // console.log(loadBalancer.services);
  res.status(200).json({ msg: "ok" });
});

app.listen(port, () => {
  const headers = [
    "counter",
    "service",
    "initial_time",
    "final_time",
    "active_processes",
    "total_processes",
    "selected_table",
  ];

  const headerRow = headers.join("\t |\t");
  const dividerRow = "-".repeat(headerRow.length + 10);

  const tableHeader = `${headerRow}\n${dividerRow}\n`;

  fs.writeFile("log.txt", tableHeader, (err) => {
    if (err) {
      console.error("Error creating log file:", err);
    } else {
      console.log("Log file created successfully");
      console.log(`Server running on port \u001b[1;32m${port} \u001b[0m`);
    }
  });
});

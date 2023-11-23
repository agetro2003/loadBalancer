const { Worker } = require("node:worker_threads");

class LoadBalancer {
  constructor(services) {
    this.services = services;
  }

  decideWinner(req) {
    this.services.forEach((service) => {
      service.score = 0;
    });

    this.services.forEach((service) => {
      if (
        service.latency === Math.min(...this.services.map((s) => s.latency))
      ) {
        service.score++;
      }
      if (
        service.freeCpu ===
        Math.max(...this.services.map((s) => s.cpuCapacity))
      ) {
        service.score++;
      }
      if (
        service.freeRam ===
        Math.max(...this.services.map((s) => s.ramCapacity))
      ) {
        service.score++;
      }
      if (
        service.activeProcesses ===
        Math.min(...this.services.map((s) => s.activeProcesses))
      ) {
        service.score++;
      }
    });

    const maxScore = Math.max(...this.services.map((s) => s.score));
    const potentialWinners = this.services.filter(
      (service) => service.score === maxScore
    );

    const winningService =
      potentialWinners[Math.floor(Math.random() * potentialWinners.length)];

    console.log("Winner: ", winningService.id);
    winningService.activeProcesses++;

    req.service = winningService.id;
    req.initialTime = Date.now();

    return winningService;
  }

  processRequest(req, res, next) {
    const selectedService = this.decideWinner(req);

    const worker = new Worker("./src/controllers/workerRead.js", {
      workerData: selectedService.id,
    });

    worker.on("message", (response) => {
      req.response = response;
      next();
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
}

module.exports = LoadBalancer;

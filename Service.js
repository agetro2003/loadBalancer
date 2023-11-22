class Service {
  constructor(id) {
    this.id = id;
    this.latency = 0;
    this.freeCpu = 1;
    this.freeRam = 1000000000000;
    this.activeProcesses = 0;
    this.totalProcesses = 0;
    this.score = 0; 
  }
}

module.exports = Service;
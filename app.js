const express = require ('express')
const cors = require ('cors')
const port = 4000;

const app = express()


let customObject = {
           client1: {
                id: 'client1',
                latency: 0,
                cpuCapacity: 1,
                ramCapacity: 1000000000000,
                activeProcess: 0,
            },
            client2:{
                id: 'client2',
                latency: 0,
                cpuCapacity: 1,
                ramCapacity: 1000000000000,
                activeProcess: 0,
            },
            client3:{
                id: 'client3',
                latency: 0,
                cpuCapacity: 1,
                ramCapacity: 1000000000000,
                activeProcess: 0,
            }
        }

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use((req, res, next) => {
    let scores = {
        client1: 0,
        client2: 0,
        client3: 0
    }
    for (const key in customObject.client1) {
        if (key == "latency") {
            let winner = customObject.client1.latency
            let serviceWinner = "client1"
            for (const key in customObject) {
                if (customObject[key].latency < winner) {
                    winner = customObject[key].latency
                    serviceWinner = key
                }
            }
            scores[serviceWinner] += 4;
        }
        if (key == "cpuCapacity") {
            let winner = customObject.client1.cpuCapacity
            let serviceWinner = "client1"
            for (const key in customObject) {
                if (customObject[key].cpuCapacity > winner) {
                    winner = customObject[key].cpuCapacity
                    serviceWinner = key
                }
            }
          
            scores[serviceWinner] += 3;
        }
        if (key == "ramCapacity") {
            let winner = customObject.client1.ramCapacity
            let serviceWinner = "client1"
            for (const key in customObject) {
                if (customObject[key].ramCapacity > winner) {
                    winner = customObject[key].ramCapacity
                    serviceWinner = key
                }
            }
          
            scores[serviceWinner] += 3;
        }
        if (key == "activeProcess") {
            let winner = customObject.client1.activeProcess
            let serviceWinner = "client1"

            for (const key in customObject) {
                if (customObject[key].activeProcess < winner) {
                    winner = customObject[key].activeProcess
                    serviceWinner = key
                }
            }
            scores[serviceWinner] += 3;
        }
    }

    let serviceWinner = "client1"
    console.log(scores)
    for (const key in scores) {
        if (scores[key] >= scores[serviceWinner]) {
            serviceWinner = key
        }
    }

    req.service = serviceWinner
    customObject[req.service].activeProcess += 1
    req.initialTime = Date.now()
    next()
})

app.use(require('./src/routes/routes'))

app.use((req, res) => {
const response = req.response
console.log(response)
console.log(req.service)
console.log(customObject)
customObject[req.service].cpuCapacity = response.freeCPU
customObject[req.service].ramCapacity = response.freeMem
customObject[req.service].activeProcess -= 1
customObject[req.service].latency = Date.now() - req.initialTime
console.log(customObject)
res.status(200).json(response)

})

app.listen(port, (req, res) => {
    console.log('servidor en ',port)
})





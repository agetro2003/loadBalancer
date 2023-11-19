const express = require ('express')
const cors = require ('cors')
const port = 4000;

const app = express()


let customObject = [
            {
                id: 'client1',
                latency: 0,
                cpuCapacity: 0,
                ramCapacity: 0,
                activeProcess: 0,
            },
            {
                id: 'client2',
                latency: 0,
                cpuCapacity: 0,
                ramCapacity: 0,
                activeProcess: 0,
            },
            {
                id: 'client3',
                latency: 0,
                cpuCapacity: 0,
                ramCapacity: 0,
                activeProcess: 0,
            }
        ]

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use((req, res, next) => {
    let scores = {
        client1: 0,
        client2: 0,
        client3: 0
    }
    for (const key in customObject[0]) {
        if (key == "latency") {
            let winner = customObject[0].latency
            let serviceWinner = "client1"
            customObject.forEach(element => {
                if (element.latency < winner) {
                    winner = element.latency
                    serviceWinner = element.id
                }
            
            }) 
            scores[serviceWinner] += 4;
        }
        if (key == "cpuCapacity") {
            let winner = customObject[0].cpuCapacity
            let serviceWinner = "client1"
            customObject.forEach(element => {
                if (element.cpuCapacity > winner) {
                    winner = element.cpuCapacity
                    serviceWinner = element.id
                }
            
            }) 
            scores[serviceWinner] += 3;
        }
        if (key == "ramCapacity") {
            let winner = customObject[0].ramCapacity
            let serviceWinner = "client1"
            customObject.forEach(element => {
                if (element.ramCapacity > winner) {
                    winner = element.ramCapacity
                    serviceWinner = element.id
                }
            
            }) 
            scores[serviceWinner] += 3;
        }
        if (key == "activeProcess") {
            let winner = customObject[0].activeProcess
            let serviceWinner = "client1"
            customObject.forEach(element => {
                if (element.activeProcess < winner) {
                    winner = element.activeProcess
                    serviceWinner = element.id
                }
            
            }) 
            scores[serviceWinner] += 3;
        }
    }

    let serviceWinner = "client1"
    for (const key in scores) {
        if (scores[key] > scores[serviceWinner]) {
            serviceWinner = key
        }
    }

    req.service = serviceWinner
    next()
})

app.use(require('./src/routes/routes'))

app.use((req, res) => {
const response = req.response
console.log(response)
res.status(200).json(response)

})

app.listen(port, (req, res) => {
    console.log('servidor en ',port)
})





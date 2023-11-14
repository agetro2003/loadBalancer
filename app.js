const express = require ('express')
const cors = require ('cors')
const port = 4000;

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use(require('./src/routes/routes'))

app.listen(port, (req, res) => {
    console.log('servidor en ',port)
})





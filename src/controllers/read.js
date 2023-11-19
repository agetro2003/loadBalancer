const clients = require("../../gRPC_cli");

function read (req, res, next) {
    let client = clients[req.service]
 client.read({}, function(err, response) {
    //console.log(response)
    req.response = response
   // res.status(200).json(response)
   next()
}
    )

}

module.exports = read
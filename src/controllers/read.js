const client = require("../../gRPC_cli");

function read (req, res, next) {

 client.read({}, function(err, response) {
    //console.log(response)
    req.response = response
   // res.status(200).json(response)
   next()
}
    )

}

module.exports = read
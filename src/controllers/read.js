const client = require("../../gRPC_cli");

function read (req, res) {
 client.read({}, function(err, response) {
    console.log(response)
    res.status(200).json(response)
 }
    )

}

module.exports = read
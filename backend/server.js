const express = require('express')
const server  = express()

server.use(express.static("../frontend"))

server.get("/", function(req, res){

    return res.sendFile(__dirname + "index.html")

})

server.listen(3000)

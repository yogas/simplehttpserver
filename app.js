const http = require('http')
const routers = require('./routes')

// create the server
const server = http.createServer(routers)
// launch the server on port 3000
server.listen(3000)
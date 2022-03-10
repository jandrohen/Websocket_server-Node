const express = require('express')
const cors = require("cors");

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Routes of the application
        this.routes();

        // Sockets events
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Directory public
        this.app.use( express.static('public'));

    }

    routes() {}

    sockets() {
        this.io.on('connection', socket => {
            console.log('client connected', socket.id);
            socket.on('disconnect', () =>{
                console.log('client disconnected', socket.id);
            })

            socket.on('send-msg', (payload) =>{
                console.log(payload)
            })
        })
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server listening on port', this.port);
        });
    }
}

module.exports = Server;

const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    socket.on('send-msg', (payload, callback) => {
        const id = 123456;
        callback( id );

        socket.broadcast.emit('send-msg', payload);
    })
}

module.exports = {
    socketController
}

const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // When a new client connects
    socket.emit( 'last-ticket', ticketControl.last );
    socket.emit( 'current-status', ticketControl.lastFour );
    socket.emit( 'remaining-tickets', ticketControl.tickets.length );

    socket.on('next-ticket', ( payload, callback) => {

        const next = ticketControl.next();
        callback( next );
        socket.broadcast.emit('remaining-tickets', ticketControl.tickets.length );

    });

    socket.on('attend-ticket', ( { desktop }, callback) => {
        if (!desktop){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.attendTicket( desktop );

        socket.broadcast.emit('current-status', ticketControl.lastFour );
        socket.emit('remaining-tickets', ticketControl.tickets.length );
        socket.broadcast.emit('remaining-tickets', ticketControl.tickets.length );



        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });

}

module.exports = {
    socketController
}

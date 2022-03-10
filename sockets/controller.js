const socketController = (socket) => {
    console.log('Client connected', socket.id);

    socket.on('disconnect', () =>{
        console.log('client disconnected', socket.id);
    })

    socket.on('send-msg', (payload, callback) => {
        const id = 123456;
        callback( id );

        socket.broadcast.emit('send-msg', payload);
    })
}

module.exports = {
    socketController
}

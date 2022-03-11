// Reference HTML
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnNew = document.querySelector('button');

const socket = io();

socket.on('connect', ()=>{
    btnNew.disabled = false;
})

socket.on('disconnect', ()=>{
    btnNew.disabled = true;
})

socket.on('last-ticket', (lastTicket) =>{
    lblNewTicket.innerText = 'Ticket ' + lastTicket;
})

btnNew.addEventListener('click', ()=>{
    socket.emit( 'next-ticket', null, ( ticket )=>{
        lblNewTicket.innerText = ticket;
    });
});

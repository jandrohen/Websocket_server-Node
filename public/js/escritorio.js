// Reference HTML
const lbldesktop = document.querySelector('h1');
const btnNew = document.querySelector('button');

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desktop = searchParams.get('escritorio');
lbldesktop.innerText = desktop;

const socket = io();

socket.on('connect', ()=>{
    btnNew.disabled = false;
})

socket.on('disconnect', ()=>{
    btnNew.disabled = true;
})

socket.on('last-ticket', (lastTicket) =>{
    // lblNewTicket.innerText = 'Ticket ' + lastTicket;
})

btnNew.addEventListener('click', ()=>{
    // socket.emit( 'next-ticket', null, ( ticket )=>{
    //     lblNewTicket.innerText = ticket;
    // });
});

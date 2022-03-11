// Reference HTML
const lblDesktop = document.querySelector('h1');
const btnNew = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');


const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desktop = searchParams.get('escritorio');
lblDesktop.innerText = desktop;
divAlert.style.display = 'none';

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

    socket.emit( 'attend-ticket', { desktop }, ( { ok, ticket, msg } ) => {
        if ( !ok ) {
            lblTicket.innerText = 'Nadie.';
            return divAlert.style.display = '';
        }
        lblTicket.innerText = `Ticket ${ticket.num}`;
    });
});

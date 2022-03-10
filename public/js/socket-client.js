
// Reference HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const socket = io();

socket.on('connect', ()=>{
    console.log('connect');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

socket.on('disconnect', ()=>{
    console.log('disconnect');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
})


// Reference HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

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

btnSend.addEventListener('click', ()=>{

    const msg = txtMessage.value;
    const payload ={
        msg,
        id: '123ABC',
        date: new Date().getTime()
    }
    socket.emit('send-msg', payload);
});

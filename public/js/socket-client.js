
// Reference HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', ()=>{

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

socket.on('disconnect', ()=>{

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
})

socket.on('send-msg', (payload)=>{
    console.log(payload)
})

btnSend.addEventListener('click', ()=>{

    const msg = txtMessage.value;
    const payload ={
        msg,
        id: '123ABC',
        date: new Date().getTime()
    }
    socket.emit('send-msg', payload, (id)=>{
        console.log('From server: ', id)
    });
});

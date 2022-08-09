const dgram = require('dgram');

const PORT_A = 8000;
const HOST_A = 'a';

const PORT_B = 8001;
const HOST_B = 'b';

const socket = dgram.createSocket('udp4');

socket.on('listening', () => {
    const address = socket.address();
    console.log('UDP socket listening on ' + address.address + ":" + address.port);
});

socket.on('message', (message, remote) => {
    console.log(remote.address + ':' + remote.port +' - ' + message);

    socket.send(message, 0, message.length, PORT_B, HOST_B, (err, bytes) => {
        if (err) throw err;
    });
});

socket.bind(PORT_A, HOST_A);
const dgram = require('dgram');

const PORT_A = 8000;
const HOST_A = 'a';

const PORT_B = 8001;
const HOST_B = 'b';

const socket = dgram.createSocket('udp4');

socket.on('message', (buf, rinfo) => {
    console.log(rinfo.address + ':' + rinfo.port +' - ' + buf);
    socket.send(buf, 0, buf.length, PORT_B, HOST_B, (err, bytes) => {
        if (err) throw err;
    });
});

socket.bind(PORT_A, HOST_A);
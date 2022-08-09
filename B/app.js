const dgram = require('dgram');

const PORT_A = 8000;
const HOST_A = 'a';

const PORT_B = 8001;
const HOST_B = 'b';

const socket = dgram.createSocket('udp4');

var count = 0;

setInterval(() => {
    count++;
    let data = {'c': count }
    let json_str = JSON.stringify(data);
    let message = new Buffer.from(json_str);
    socket.send(message, 0, message.length, PORT_A, HOST_A, (err, bytes) => {
        if (err) throw err;
    });
}, 500);


socket.on('message', (buf, rinfo) => {
    console.log(rinfo.address + ':' + rinfo.port +' - ' + buf);
    let str = buf.toString('ascii', 0, rinfo.size);
    let msg = JSON.parse(str);
    console.log(msg);
});

socket.bind(PORT_B, HOST_B);
let debug = 0;
const dgram = require('dgram');
const net = require('net');

// Address of container A
const PORT_A = 8000;
const HOST_A = 'a';
// Addresss of container B
const PORT_B = 8001;
const HOST_B = 'b';

// TCP
net.createServer(sock => {
    sock.on('data', data => {
        console.log(data + ' from ' + sock.remoteAddress + ':' + sock.remotePort);
        sock.write('server -> Repeating: ' + data);
    });
    sock.on('close', () => {
        console.log('client closed connection');
    });
}).listen(PORT_B,HOST_B);

count = 0;
// UDP
while(count < 5){
  const socket = dgram.createSocket('udp4');
  let data = {'i':HOST_B,'p':PORT_B};
  let json_str = JSON.stringify(data);
  let message = new Buffer.from(json_str);
  socket.send(message, 0, message.length, PORT_A, HOST_A, (err, bytes) => {if (err) throw err;});
  count++;
}
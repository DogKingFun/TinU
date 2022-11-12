let debug = 0;
const dgram = require('dgram');
const net = require('net');

const PORT_A = 8000;
const HOST_A = 'a';

const socket = dgram.createSocket('udp4');
let count = 1;

socket.on('message', (buf, rinfo) => {
  console.log(rinfo.address + ':' + rinfo.port +' - ' + buf);
  let str = buf.toString('ascii', 0, rinfo.size);
  let msg = JSON.parse(str);
  let ip = msg.i;
  let port = msg.p;
  // TCP
  let client = net.connect(port, ip, () => {
    console.log('connected to server:'+count);
    client.write(count + 'Hello World!');
  });
  client.on('data', data => {
    console.log('client-> ' + data);
    client.destroy();
  });
  client.on('close', () => {
    count += 1;
    console.log('client-> connection is closed');
  });

});

socket.bind(PORT_A, HOST_A);
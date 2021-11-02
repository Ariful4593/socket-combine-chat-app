const express = require('express');
const app = express();
const http = require('http');

const expressServer = http.createServer(app);

const { Server } = require('socket.io');

let io = new Server(expressServer);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/rooms.html");
})

io.on('connection', (socket) => {
    socket.join('kitchen-room');
    let sizeOfkitchen = io.sockets.adapter.rooms.get('kitchen-room').size;
    io.sockets.in('kitchen-room').emit('cooking', 'Fried rice cooking = ' + sizeOfkitchen);


    socket.join('bed-room');
    io.sockets.in('bed-room').emit('sleep', 'I am sleeping...')
})

//It's only for chat application
// io.on('connection', (socket) => {
//     socket.on('chat', (msg) => {
//         io.emit('chat_show', msg);
//     })
// })





expressServer.listen(3000, () => console.log('Chat server running'))
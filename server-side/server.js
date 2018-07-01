const express = require ('express');
const fs = require('fs');
const socketIO = require('socket.io');
const path = require('path');

const imagesArr = [];

const port = 3001;
const app = express();

const server = require('http').Server(app);
const io = socketIO(server);

const watchedFolderPath = path.join(__dirname, '..', 'client-side', 'public');

fs.watch(watchedFolderPath, { encoding: 'utf8'}, (eventType, filename) => {
    if (filename && eventType === 'change') {
        const isImageOnArray = imagesArr.includes(filename);

        if (!isImageOnArray) {
            imagesArr.push(filename);             
            io.emit('newImage', {imageURL: filename});
        };
        
    };
});

io.on('connection', (socket) => {
    console.log('Socket connected');    
});

server.listen(port, () =>{
    console.log(`Server started on port ${ port }`);    
});
const express = require ('express');
const fs = require('fs');
const socketIO = require('socket.io');
const path = require('path');
const cloudinary = require('cloudinary');
const QRCode = require('qrcode');

const port = 3001;
const app = express();

const server = require('http').Server(app);
const io = socketIO(server);

let imagesArr = [
    {
        src: 'images/My Post.jpg'
    }
];
const watchedFolderPath = path.join(__dirname, 'images');

const qrCodeConf = {
    color: {
        dark: '#000000ff',
        light: '#ffffffff'
    }
};

app.use(express.static(watchedFolderPath));
cloudinary.config({
    cloud_name: 'dslcu0wdh',
    api_key: '537972452593183',
    api_secret: 'es_pkuNikJXDdlRj0RnuPCG28u8'
})

let isImageUploading = false;

// emitter from server.js
fs.watch(watchedFolderPath, { encoding: 'utf8'}, (eventType, filename) => {
    console.log(eventType, filename);
    if (filename && eventType === 'rename' && filename !== 'qrcodes') {
        const filenameInfo = filename.split('.');
        const extension = filenameInfo[1];
        console.log(extension, filenameInfo);
        if (extension === 'JPG') {
            const isImageOnArray = imagesArr.find(image => image.src === filename);
    
            if (!isImageOnArray) {            
                imagesArr.push({
                    src: filename
                });
                console.log('Sending newImageEvent with the file:', filename);            
                io.emit('newImage', {imageURL: filename});
            };        
        };
    };
});

io.on('connection', (socket) => {
    console.log('Socket connected');  

    socket.on('uploadImage', ({ fileName }) => {
        isImageUploading = true;
        cloudinary.uploader.upload(`images/${fileName}`, (result, error) => {
            isImageUploading = false;
            QRCode.toFile(`images/qrcodes/${result.original_filename}.png`, result.url, qrCodeConf, function (err) {
                if (err) throw err;
                const data = {
                    src: `${result.original_filename}${result.format}`,
                    qrCodeURL: `qrcodes/${result.original_filename}.png`,
                    uploadedURL: result.url
                }
                io.emit('imageFinishedUploading', data);
            });
        });
    });
});





server.listen(port, () =>{
    console.log(`Server started on port ${ port }`);    
});
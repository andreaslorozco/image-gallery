import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Carousel from './Components/Carousel';
import Button from './Components/Button';
import Modal from './Components/Modal';

const socket = socketIOClient('http://localhost:3001');
const fixedURL = 'http://localhost:3001/';

let currentIndex = 0;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      endpoint: fixedURL,
      imageArr: [
        { 
          src: `${fixedURL}My Post.jpg`,
          fileName: 'My Post.jpg',
          uploaded: false,
          uploadedURL: '',
          qrCodeURL: ''
        }
      ],
      isImageUploading: false,
      buttonMessage: 'Compartir',
      modal: false
    };
  };

  uploadHandle() {    
    socket.emit('uploadImage', this.state.imageArr[currentIndex]);
    this.setState({
      isImageUploading: true,
      buttonMessage: 'Subiendo...'
    });
    
    this.toggleModal();

  };

  getIndexFromCarousel(returnedIndex) {
    currentIndex = returnedIndex;
  };

  toggleModal() {
    if(!this.state.isImageUploading) {
      this.setState({
        modal: !this.state.modal
      });
    };
  };
  
  componentDidMount() {
    
    socket.on('connect', () => {
      console.log('Client connected to server');      
    });
    
    socket.on('newImage', ({ imageURL }) => {
      const newImageArr = [...this.state.imageArr];
      if (newImageArr.length >= 10) {
        newImageArr.splice(0,1);
      };
      newImageArr.push({
        src: `${fixedURL}${imageURL}`,
        fileName: imageURL,
        uploaded: false
      });
      
      this.setState({
        imageArr: newImageArr
      });
      
    }); 

    socket.on('imageFinishedUploading', (data) => {
      const newImageArr = [...this.state.imageArr];   
      newImageArr[currentIndex].uploaded = true;
      newImageArr[currentIndex].uploadedURL = data.uploadedURL;
      newImageArr[currentIndex].qrCodeURL = `${fixedURL}${data.qrCodeURL}`;
      
      this.setState({
        imageArr: newImageArr,
        isImageUploading: false,
        buttonMessage: 'Compartir'
      });
    });
    
  };


  render() {
    return (
      <div className="App mt-3">
        <Modal
          modal={ this.state.modal }
          toggle={() => this.toggleModal() }
          imageData={ this.state.imageArr[currentIndex] }
          disabledState={ this.state.isImageUploading }
        />
        
        <Carousel
          imageURL={ this.state.imageArr[this.state.imageArr.length - 1].src }
          callbackFromParent={ this.getIndexFromCarousel }
        />
        <Button onClick={() => this.uploadHandle() } disabledState={ this.state.isImageUploading } buttonMessage={ this.state.buttonMessage }/>
      </div>
    );
  };
}

export default App;

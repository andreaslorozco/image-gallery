import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';

const socket = socketIOClient('http://localhost:3001');

socket.on('connect', () => {
  console.log('Client connected to server');      
});


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      endpoint: 'http://localhost:3001',
      imageArr:  ['fff.png',
                ],
    }
  }

  // newImageHandler(newImageArr) {
  //   this.setState({
  //     imageArr: newImageArr
  //   });
  // };

  render() {
    
    socket.on('newImage', ({ imageURL }) => {
      const isImageOnArray = this.state.imageArr.includes(imageURL);
      if (!isImageOnArray) {
        const newImageArr = [...this.state.imageArr];
        newImageArr.push(imageURL);      
        this.setState({
          imageArr: newImageArr
        });
      };
    });

    return (
      <div className="App">
        <Navbar/>
        <Carousel imageArr={ this.state.imageArr }/>
      </div>
    );
  }
}

export default App;
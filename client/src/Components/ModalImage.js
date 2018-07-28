import React from 'react';
import loadingGif from './../loading.gif';

const ModalImage = ( { imageData } ) => {
    if ( imageData.uploaded) {
        return <img src={ imageData.qrCodeURL }  height="180" width="180" alt="QR Code"/>;
      } else {
        return <img src={loadingGif}  height="180" width="180" alt="loading gif"/>
      }
}

export default ModalImage;
import React from 'react';

const ModalText = ( { imageData } ) => {
    if ( imageData.uploaded) {
        return <p><b>¡La imagen se ha subido!</b> Escaneá el código de barras que ves arriba para obtener un enlace directo a la imagen. Después de eso podés descargarla a tu celular y compartirla en tus redes socailes favoritas. <b>#bodaireyandi</b></p>;
      } else {        
        return <p><b>¡La imagen se está subiendo!</b> Para que podás compartir la imagen, primero hay que subirla a <em>la nube</em>. ¡Dale un toque! <b>#bodaireyandi</b></p>;
    }
}

export default ModalText;
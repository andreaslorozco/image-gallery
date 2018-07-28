import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalImage from './ModalImage';
import ModalText from './ModalText';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.modal,
      imageData: props.imageData,
      disabledState: props.disabledState
    };
  }

  componentWillReceiveProps( props ) {
      this.setState({
          modal: props.modal,
          imageData: props.imageData,
          disabledState: props.disabledState
      });
  };

  render() {
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={this.state.modal} toggle={ this.props.toggle } className={this.props.className}>
          <ModalHeader toggle={ this.props.toggle }>Obtener Imagen</ModalHeader>
          <ModalBody className="d-flex justify-content-center align-items-center flex-column">
            <ModalImage imageData={ this.state.imageData }/>            
            <ModalText imageData={ this.state.imageData } />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ this.props.toggle } disabled={ this.state.disabledState }>Cerrar</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
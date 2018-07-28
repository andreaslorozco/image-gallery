import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Share2 } from 'react-feather';

class ButtonComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onClick: props.onClick
        }       
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <Button
                            color="primary"
                            size="lg"
                            className="btn-large mt-4"
                            onClick={() => this.state.onClick() }
                            block
                            disabled={ this.props.disabledState }
                        > <Share2 /> { this.props.buttonMessage } </Button>{' '}
                    </div>
                    <div className="col-sm"></div>
                    <div className="col-sm"></div>
                </div>
            </div>
        );
    };
};

export default ButtonComponent;
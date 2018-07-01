import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

class CarouselComponent extends Component{
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            imageArr: props.imageArr,
            index: 0,
            direction: null
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            imageArr: nextProps.imageArr,
            index: nextProps.imageArr.length - 1,
        });  
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }

    render() {
        const { index, direction } = this.state;
        
        const listImages = this.state.imageArr.map((url) => {
            return (
                <Carousel.Item key={ url }>
                    <img width={1500} height={500} alt="900x500" src={ url } />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        })
        
        return(
            <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
            >
                {listImages}
            </Carousel>
        );
    };
};

export default CarouselComponent;
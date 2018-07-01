import React from 'react';
import { Navbar } from 'react-bootstrap';

const navbar = () => {
    return (
        <Navbar >
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#home">Boda Ire y Andi || Photobooth</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
        </Navbar>
    );
};

export default navbar;
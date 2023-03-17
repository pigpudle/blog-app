import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function Header({ ...props }) {
    return (<Navbar bg="light" {...props}>
        <Container>
            <Navbar.Brand href="/">Header</Navbar.Brand>
        </Container>
    </Navbar>);
}

export default Header;
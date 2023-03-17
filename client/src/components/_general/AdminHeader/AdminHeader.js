import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container } from 'react-bootstrap';

function AdminHeader({ children }) {
    return (<Navbar bg="light" className="mb-5">
        <Container>
            {children}
        </Container>
    </Navbar>);
}

AdminHeader.propTypes = {
    children: PropTypes.any.isRequired
};

export default AdminHeader;
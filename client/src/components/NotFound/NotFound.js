import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AlignCenterRow from '../_general/AlignCenterRow';

function NotFound() {
    return (<AlignCenterRow>
        <Col sm={8}>
            <h1>404 Not Found</h1>
            <p>This page does not exist.</p>
            <Link to="/">Go to the main page</Link>
        </Col>
    </AlignCenterRow>);
}

export default NotFound;
import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

function AlignCenterRow({ children }) {
    return (<Row className="h-100 align-items-center justify-content-center">
        {children}
    </Row>)
}

AlignCenterRow.propTypes = {
    children: PropTypes.any.isRequired
};

export default AlignCenterRow;
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

function Error({ text }) {
    return (<div className="w-100">
        <Alert variant="danger">{text}</Alert>
    </div>)
}

Error.propTypes = {
    text: PropTypes.string.isRequired
};

export default Error;
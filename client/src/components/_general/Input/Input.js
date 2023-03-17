import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
function Input({ id, label, value, onTextChange, multiline = false, ...props }) {
    const handleChange = (e) => {
        onTextChange(e.target.value);
    };

    return (<>
        <Form.Label htmlFor={id}>{label}</Form.Label>
        <Form.Control
            id={id}
            name={id}
            value={value}
            onChange={handleChange}
            as={multiline ? 'textarea' : 'input'}
            {...props}
        />
    </>);
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onTextChange: PropTypes.func.isRequired,
    multiline: PropTypes.bool
};

export default Input;
import React from 'react';
import PropTypes from 'prop-types';
import { Button as BootstrapButton } from 'react-bootstrap';

function Button({ text, variant = 'primary', ...props }) {
    return (<BootstrapButton variant={variant} type="submit" {...props}>
        {text}
    </BootstrapButton>)
}

Button.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    variant: PropTypes.string
};

export default Button;
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

function Tags({ tags }) {
    return (<div className="d-flex ">
        {tags && tags.map(tag => <Badge variant="secondary" className="mx-1">{tag}</Badge>)}
    </div>)
}

Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Tags;
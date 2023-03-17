import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

function Pagination({ page, size, totalPages, onNavigate }) {

    const elements = useMemo(() => {
        return (new Array(totalPages).fill(null).map((_, index) => (<Button
            type="button"
            variant={page === index+1 ? 'secondary' : 'light'}
            text={index+1}
            onClick={() => onNavigate({ page: index+1, size })}
            key={index}
            className="mr-3"
        />)))
    }, [totalPages, page, onNavigate, size]);

    return (<div>
        {page > 1 && <Button type="button" text="Previous" onClick={() => onNavigate({ page: 1, size })} className="mr-3" />}
        {elements}
        {page < totalPages && <Button type="button" text="Next" onClick={() => onNavigate({ page: totalPages, size })} />}
    </div>)
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onNavigate: PropTypes.func.isRequired,
};

export default Pagination;
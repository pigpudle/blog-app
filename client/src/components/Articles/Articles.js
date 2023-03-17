import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Tags from '../_general/Tags';
import Pagination from '../_general/Pagination';

function Articles({ articles, loadArticles, pagination, setPagination }) {
    
    useEffect(() => {
        loadArticles(pagination);
    }, [pagination?.size, pagination?.page]);

    const handlePagination = useCallback(({ page, size }) => {
        window.history.pushState(null, null, `?page=${page}&size=${size}`);
        window.scrollTo(0,0);
        setPagination({ ...pagination, page, size });
    }, [setPagination, pagination]);

    return (<Container>
        {Object.keys(articles).length > 0 && (<ol>
            {Object.keys(articles).map(key => {
                const article = articles[key];
                return (<li key={article.id} className="mb-5">
                    <Link to={`/articles/${article.id}`}><h2>{article.title}</h2></Link>
                    <p>{article.description}</p>
                    <Tags tags={article.tags} />
                </li>);
            })}
        </ol>)}
        {Object.keys(articles).length === 0 && <p>No items</p>}
        <Pagination {...pagination} onNavigate={handlePagination} />
    </Container>)
}

Articles.propTypes = {
    articles: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string)
    })).isRequired,
    loadArticles: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
    setPagination: PropTypes.func.isRequired
};

export default Articles;
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ButtonGroup, Button, Container } from 'react-bootstrap';

import './AdminArticles.scss';
import AdminHeader from '../_general/AdminHeader';

function AdminArticles({ articles, loadArticles, history, onArticleDelete }) {

    useEffect(() => {
        loadArticles();
    }, []);

    return (<>
        <AdminHeader>
            <h1>Articles</h1>
            <Button onClick={() => history.push('/admin/articles/create')}>Add new</Button>
        </AdminHeader>
        <Container>
            {Object.keys(articles).length > 0 && (<ol>
                {Object.keys(articles).map(key => {
                    const article = articles[key];
                    return (<li
                        key={article.id}
                        className="d-flex justify-content-between align-items-center mb-2 pl-3 AdminArticles-item"
                    >
                        <Link to={`/articles/${article.id}`} target="_blank">
                            {article.title}
                        </Link>
                        <ButtonGroup>
                            <Button size="sm" variant="secondary" onClick={() => history.push(`/admin/articles/edit/${article.id}`)}>
                                <FontAwesomeIcon icon={faPencilAlt} size="xs" />
                            </Button>
                            <Button size="sm" variant="danger" onClick={() => onArticleDelete(article.id)}>
                                <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                            </Button>
                        </ButtonGroup> 
                    </li>);
                })}
            </ol>)}
            {Object.keys(articles).length === 0 && <p>No items</p>}
        </Container>
    </>)
};

AdminArticles.propTypes = {
    articles: PropTypes.objectOf(PropTypes.shape({
        id : PropTypes.string.isRequired,
        title : PropTypes.string.isRequired
    })).isRequired,
    loadArticles: PropTypes.func.isRequired,
    onArticleDelete: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default AdminArticles;
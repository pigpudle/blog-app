import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import Tags from '../_general/Tags';

function Article({ id, loadArticle, article }) {

    useEffect(() => {
        loadArticle(id);
    }, [id]);

    return (<Container>
        {article && (<>
            <h2>{article.title}</h2>
            <div
                dangerouslySetInnerHTML={{
                __html: article.content
                }}
            ></div>
            <Tags tags={article.tags} />
        </>)}
    </Container>);
}

Article.propTypes = {
    id: PropTypes.string.isRequired,
    loadArticle: PropTypes.func.isRequired,
    article: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string)
    })
};

export default Article;
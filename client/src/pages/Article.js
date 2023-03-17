import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import withAppLayout from '../hoc/withAppLayout';
import ArticleComponent from '../components/Article';
import { loadArticle } from '../store/articles/actionCreators';
import { articlesSelector } from '../store/articles/selectors';


function Article(props) {
    const { id } = useParams();
    const articles = useSelector(articlesSelector);
    const article = useMemo(() => articles[id], [id, articles]);

    return <ArticleComponent id={id} article={article} {...props} />
}

const mapDispatchToProps = dispatch => ({
    loadArticle: (id) => dispatch(loadArticle(id))
});

export default connect(undefined, mapDispatchToProps)(withAppLayout(Article));
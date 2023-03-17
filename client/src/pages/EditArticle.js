import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import EditArticleComponent from '../components/EditArticle';
import { loadArticle } from '../store/articles/actionCreators';
import { articlesSelector } from '../store/articles/selectors';

function EditArticle(props) {
    const { id } = useParams();

    return <EditArticleComponent id={id} {...props} />
}

const mapStateToProps = (state) => ({
    articles: articlesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    loadArticle: (id) => dispatch(loadArticle(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
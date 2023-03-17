import { connect } from 'react-redux';

import AdminArticles from '../components/AdminArticles';
import { articlesSelector } from '../store/articles/selectors';
import { loadArticles, deleteArticle } from '../store/articles/actionCreators';

const mapStateToProps = state => ({
    articles: articlesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    loadArticles: () => dispatch(loadArticles()),
    onArticleDelete: (id) => dispatch(deleteArticle(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminArticles);
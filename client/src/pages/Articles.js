import { connect } from 'react-redux';

import Articles from '../components/Articles';
import { articlesSelector, paginationSelector } from '../store/articles/selectors';
import { loadArticles, setPagination} from '../store/articles/actionCreators';
import withAppLayout from '../hoc/withAppLayout';

const mapStateToProps = state => ({
    articles: articlesSelector(state),
    pagination: paginationSelector(state)
});

const mapDispatchToProps = dispatch => ({
    loadArticles: (pagination) => dispatch(loadArticles(pagination)),
    setPagination: (pagination) => dispatch(setPagination(pagination))
});

export default connect(mapStateToProps, mapDispatchToProps)(withAppLayout(Articles));
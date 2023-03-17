import { connect } from 'react-redux';

import Login from '../components/Login';
import { login } from '../store/user/actionCreators';
import { isAuthenticatedSelector, loadingSelector, errorSelector } from '../store/user/selectors';

const mapStateToProps = state => ({
    isAuthenticated: isAuthenticatedSelector(state),
    loading: loadingSelector(state),
    error: errorSelector(state)
});

const mapDispatchToProps = dispatch => ({
    onLogin: (username, password) => dispatch(login(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
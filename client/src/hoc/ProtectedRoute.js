import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { isAuthenticatedSelector } from '../store/user/selectors';

function ProtectedRoute({ component: Component, ...props }) {
    const isAuthenticated = props.isAuthenticated;
    
    return (<Route {...props} render={props => (
        isAuthenticated ? 
            <Component {...props} /> :
            <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
    )} />);
}

const mapStateToProps = state => ({
    isAuthenticated: isAuthenticatedSelector(state)
});

export default connect(mapStateToProps)(ProtectedRoute);
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import Input from '../_general/Input';
import Button from '../_general/Button';
import Loader from '../_general/Loader';
import Error from '../_general/Error';
import AlignCenterRow from '../_general/AlignCenterRow';

function Login({ onLogin, isAuthenticated, loading, error, ...props }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        onLogin(username, password);
    };

    if (isAuthenticated) {        
        return (<Redirect to={{ pathname: '/admin/articles' }} />);
    }

    return (<Container
        className="h-100"
    >
        <AlignCenterRow>
            <Col xl={4} lg={5} md={7} sm={8}>
                <h1>
                    Login as an admin
                </h1>
                <Form onSubmit={handleSubmit}>
                    <Input
                        id="username"
                        label="Username:"
                        value={username}
                        onTextChange={setUsername}
                        className="mb-3"
                    />
                    <Input
                        id="password"
                        label="Password:"
                        type="password"
                        value={password}
                        onTextChange={setPassword}
                        className="mb-3"
                    />
                    <Button
                        text="Submit"
                        className="d-block ml-auto"
                        disabled={loading || !username || !password}
                    />
                    {loading && (<div className="w-100 mt-3">
                        <Loader />
                    </div>)}
                    {error && (<div className="w-100 mt-3">
                        <Error text={error} />
                    </div>)}
                </Form>
            </Col>
        </AlignCenterRow>
    </Container>);
};

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default Login;
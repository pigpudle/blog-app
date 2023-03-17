import React, { useState, useEffect, useCallback } from 'react';
import Editor from 'jodit-react';
import { Form, Container, Button as BootstrapButton } from 'react-bootstrap';

import Input from '../_general/Input';
import Button from '../_general/Button';
import AdminHeader from '../_general/AdminHeader';
import api, { catchErrorText } from '../../services/api';
import Loader from '../_general/Loader';
import Error from '../_general/Error';

function EditArticle({ history, id, articles, loadArticle }) {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ content, setContent ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if (id) {
            loadArticle(id);
        }
    }, [id]);

    useEffect(() => {
        const article = articles[id];
        if (article) {
            setTitle(article.title);
            setDescription(article.description);
            setContent(article.content);
        }
    }, [id, articles]);

    const handleSubmitClick = useCallback(async () => {
        setError(null);
        setLoading(true);

        const data = {
            title,
            description,
            content,
        };

        try {
            if (id) {
                await api.editArticle(id, data);
            } else {
                await api.createArticle(data);
            }
            
            history.push('/admin/articles');
        } catch(err) {
            setError(catchErrorText(err));
            setLoading(false);
        }
    }, [id, title, description, content]);

    return (<>
        <AdminHeader>
            <BootstrapButton onClick={() => history.goBack()}>Go back</BootstrapButton>
            <h1>Create article</h1>
            <Button text="Submit" onClick={handleSubmitClick} disabled={loading} />
        </AdminHeader>
        <Container>
            <Form>
                <Input
                    id="title"
                    label="Title:"
                    value={title}
                    onTextChange={setTitle}
                    className="mb-3"
                />
                <div className="mb-3">
                    <Editor
                        value={content}
                        onChange={setContent}
                    />
                </div>
                <Input
                    id="description"
                    label="Description:"
                    value={description}
                    multiline={true}
                    onTextChange={setDescription}
                    className="mb-3"
                />
                {loading && (<div>
                    <Loader />
                </div>)}
                {error && (<div>
                    <Error text={error} />
                </div>)}
            </Form>
        </Container>
    </>);
}

export default EditArticle;
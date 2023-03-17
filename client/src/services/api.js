import axios from 'axios';

const hostname = process.env.REACT_APP_API_HOSTNAME;

const api = {

    internal: {
        client: axios.create({
            baseURL: hostname
        }),
        setToken: function(token) {
            this.client = axios.create({
                baseURL: hostname,
                headers: {'Authorization': token}
            });
        }
    },

    async _handleRequest(method, payload) {
        try {
            const { data } = await this.internal.client[method](...payload);
            return data;
        } catch(err) {
            if (err?.response?.status === 401 && err?.response?.data?.error?.type === 'TokenExpiredError') {
                return this._refreshTokenAndMakeRequest(method, payload);
            }

            throw err;  
        }
    },

    async _refreshTokenAndMakeRequest(method, payload) {
        try {
            const { data: tokenData } = await this.internal.client.post('/users/refreshToken');
            this.internal.setToken(tokenData.token);
            const { data } = await this.internal.client[method](...payload);
            return data;
        } catch(err) {
            throw err;
        }        
    },

    async login(username, password) {
        const { data } = await this.internal.client.post('/users/login', {
            username, password
        });
        return data;
    },

    async getArticles({ page, size }) {
        const { data } = await this.internal.client.get('/articles/', {
            params: {
                page, size
            }
        });
        return data;
    },

    async getArticle(id) {
        const { data } = await this.internal.client.get(`/articles/${id}`);
        return data;
    },

    createArticle(data) {
        return this._handleRequest('post', ['/articles', data]);
    },

    deleteArticle(id) {
        return this._handleRequest('delete', [`/articles/${id}`]);
    },

    editArticle(id, data) {
        return this._handleRequest('put', [`/articles/${id}`, data]);
    }

};

const catchErrorText = (err) => {
    if (err.response?.data?.error?.message) {
        return err.response?.data?.error?.message;
    } else {
        return err.message;
    }  
};

export { catchErrorText };

export default api;
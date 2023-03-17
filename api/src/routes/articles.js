const express = require('express');

const Article = require('../models/article');
const auth = require('../middleware/auth');
const checkPermission = require('./utils/check-permission');
const logger = require('../utils/logger');
const PERMISSIONS = require('../constants/permissions');

const articlesRouter = express.Router();

articlesRouter.post('/', auth, async (req, res) => {
    if (!checkPermission(req.user, PERMISSIONS.WRITE)) {
        return res.status(403).send({ error: { message: 'Not enough permissions for this action' } });
    }

    const {
        title,
        description,
        content,
        tags
    } = req.body;

    try {
        const article = new Article({
            title, description, content, tags
        });
        await article.save();
        res.send(article);
    } catch(err) {
        logger.error(err.message);
        res.status(400).send({ error: { message: 'Invalid article data' } });
    }
});

articlesRouter.put('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const {
            title,
            description,
            content,
            tags
        } = req.body;

        if (!id) {
            return res.status(400).send({ error: { message: 'Provide id value' } });
        }

        const article = await Article.findByIdAndUpdate(id, { title, description, content, tags });

        if (!article) {
            return res.status(404).send();
        }

        res.send(article);
    } catch(err) {
        res.status(500).send({ error: { message: err.message } });
    }
});

articlesRouter.get('/', async (req, res) => {
    try {
        const page = Math.max(1, req.query.page || 1); // page numbering starts from 1
        const size = parseInt(req.query.size) || 10;
        const articles = await Article.find().limit(size).skip(size * (page-1)).select('title description tags createdAt updatedAt');
        const totalCount = await Article.estimatedDocumentCount();
        res.send({
            data: articles,
            pagination: {
                page,
                size,
                totalPages: Math.ceil(totalCount/size)
            }
        });
    } catch(err) {
        res.status(500).send({ error: { message: err.message } });
    }
});

articlesRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ error: { message: 'Provide id value' } });
        }

        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).send();
        }

        res.send(article);
    } catch(err) {
        res.status(500).send({ error: { message: err.message } });
    }
});

articlesRouter.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ error: { message: 'Provide id value' } });
        }

        const article = await Article.findByIdAndDelete(id);

        if (!article) {
            return res.status(404).send();
        }

        res.send(article);
    } catch(err) {
        res.status(500).send({ error: { message: err.message } });
    }
});

module.exports = articlesRouter;
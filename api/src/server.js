const express = require('express');
require('./db/mongoose');
const { users, articles } = require('./routes');
const logger = require('./utils/logger');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
const isDev = !!process.env.IS_DEV;

if (isDev) {
    app.use(cors());
}

app.use(express.json());
app.use('/users', users);
app.use('/articles', articles);

app.listen(port, () => {
    logger.log(`Server is listening on port ${port}`);
});
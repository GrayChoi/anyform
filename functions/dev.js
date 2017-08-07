global.__DEV__ = true;

const express = require('express');
const morgan = require('morgan');
const { api } = require('./index.js');

const app = express();

app.use(morgan('dev', { immediate: true }));
app.options('*', (req, res) => {
    res.status(200).send();
    return;
});
app.use('/api', api);

app.listen(9090);
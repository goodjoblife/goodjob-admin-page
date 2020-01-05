// @flow
const express = require('express');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static('./build'));

app.get('*', (req, res) => res.sendFile('./build/index.html'));

app.listen(PORT, () => console.info(`the app listening on ${PORT}!`));

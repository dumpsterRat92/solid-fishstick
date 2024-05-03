const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(`index.html`);
});

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`);
});

app.use(routes);

app.listen(PORT, () =>
    console.log(`listening at http://localhost:${PORT}`)
);
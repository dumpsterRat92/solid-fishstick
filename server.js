const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.static('public'));
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`); 
});

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`); 
});

// Mount custom routes
app.use(routes);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () =>
    console.log(`listening at http://localhost:${PORT}`)
);

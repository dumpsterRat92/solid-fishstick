// Importing required modules
const express = require('express');
const routes = require('./routes');

// Setting up the port
const PORT = process.env.PORT || 3001;

// Creating an instance of Express
const app = express();

// Serving static files from the 'public' directory
app.use(express.static('public'));

// Parsing incoming JSON data
app.use(express.json());

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(`index.html`); // Sending the index.html file
});

// Route for the notes page
app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`); // Sending the notes.html file
});

// Using routes defined in separate files
app.use(routes);

// Starting the server and listening on the specified port
app.listen(PORT, () =>
    console.log(`listening at http://localhost:${PORT}`)
);
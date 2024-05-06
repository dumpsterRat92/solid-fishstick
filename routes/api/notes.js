const express = require('express');
const router = express.Router();
const path = require('path');
const shortid = require('shortid');
const fs = require('fs').promises;

const Notes = path.resolve(__dirname, '../../db/db.json');

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(Notes);
        const notes = JSON.parse(data);
        res.status(200).json(notes);
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newNote = req.body;
        newNote.id = shortid.generate();

        const data = await fs.readFile(Notes);
        const notes = JSON.parse(data);
        notes.push(newNote);

        await fs.writeFile(Notes, JSON.stringify(notes, null, 2));
        
        res.status(201).json(notes);
    } catch (err) {
        console.error('Error writing file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await fs.readFile(Notes);
        const notes = JSON.parse(data);

        const filteredNotes = notes.filter(note => note.id !== req.params.id);

        await fs.writeFile(Notes, JSON.stringify(filteredNotes, null, 2));

        res.status(200).json(filteredNotes);
    } catch (err) {
        console.error('Error writing file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

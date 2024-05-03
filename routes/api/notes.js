const express = require('express');
const router = express.Router();
const path = require('path');
const shortid = require('shortid');
const fs = require('fs');

const Notes = path.resolve(__dirname, '../../db/db.json');

router.get('/', (req, res) => {
    fs.readFile(Notes, (err, data) => {
        if(err) {
            console.error('Error reading file:', err);
            return res.status(500).json({error: 'Internal Server Error'});
        }
        const notes = JSON.parse(data);
        res.status(200).json(notes);
    });
});

router.post('/', (req, res) => {
    const newNote = req.body;

    newNote.id = shortid.generate();

    fs.readFile(Notes, (err, data) => {
        if(err) {
            console.error('Error reading file:', err);
            return res.status(500).json({error: 'Internal Server Error'});
        }

        const notes = JSON.parse(data);

        notes.push(newNote);

        fs.writeFile(Notes, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({error: 'Internal Server Error'});
            }

            res.status(201).json(notes);
        });
    });
});

router.delete('/:id', (req, res) => {
    fs.readFile(Notes, (err, data) => {
        if(err) {
            console.error('Error reading file:', err);
            return res.status(500).json({error: 'Internal Server Error'});
        }

        const notes = JSON.parse(data);

        const filteredNotes = notes.filter(note => note.id !== req.params.id);

        fs.writeFile(Notes, JSON.stringify(filteredNotes, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({error: 'Internal Server Error'});
            }

            res.status(200).json(filteredNotes);
        });
    });
});

module.exports = router;
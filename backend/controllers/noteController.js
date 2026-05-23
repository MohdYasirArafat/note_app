
const Note = require('../models/note');

// Create Note
const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = new Note({ title, content, user: req.user });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get All Notes (User Specific)
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get Single Note
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.user.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });
        
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update Note
const updateNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.user.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });

        note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Note
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.user.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });

        await note.deleteOne();
        res.json({ message: 'Note removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote };

const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const router = express.Router();

// Temporary in-memory storage (replace with database)
let notes = [
    {
        id: 1,
        title: 'Introduction to React Hooks',
        description: 'Comprehensive guide covering useState, useEffect, and custom hooks',
        subject: 'Computer Science',
        author: {
            id: 1,
            name: 'John Doe',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff'
        },
        uploadDate: new Date('2024-01-15').toISOString(),
        downloadCount: 245,
        averageRating: 4.8,
        reviewCount: 32,
        fileType: 'pdf',
        fileSize: 2048576,
        fileName: 'react-hooks-guide.pdf',
        tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
        thumbnail: 'https://via.placeholder.com/300x400/3B82F6/FFFFFF?text=React+Hooks'
    },
    {
        id: 2,
        title: 'Advanced JavaScript Concepts',
        description: 'Deep dive into closures, prototypes, async/await, and ES6+ features',
        subject: 'Computer Science',
        author: {
            id: 2,
            name: 'Jane Smith',
            avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=9333EA&color=fff'
        },
        uploadDate: new Date('2024-01-10').toISOString(),
        downloadCount: 189,
        averageRating: 4.6,
        reviewCount: 28,
        fileType: 'pdf',
        fileSize: 3145728,
        fileName: 'advanced-javascript.pdf',
        tags: ['JavaScript', 'Programming', 'Advanced'],
        thumbnail: 'https://via.placeholder.com/300x400/9333EA/FFFFFF?text=JavaScript'
    }
];

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only PDF, DOC, DOCX, and image files are allowed'));
        }
    }
});

// Validation schemas
const noteSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    subject: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).max(10)
});

// @route   GET /api/notes
// @desc    Get all notes with filtering and pagination
// @access  Public
router.get('/', (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            search = '',
            subject = '',
            sort = 'newest'
        } = req.query;

        let filteredNotes = [...notes];

        // Search filter
        if (search) {
            filteredNotes = filteredNotes.filter(note =>
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.description.toLowerCase().includes(search.toLowerCase()) ||
                note.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
            );
        }

        // Subject filter
        if (subject && subject !== 'All') {
            filteredNotes = filteredNotes.filter(note => note.subject === subject);
        }

        // Sorting
        switch (sort) {
            case 'newest':
                filteredNotes.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                break;
            case 'popular':
            case 'downloads':
                filteredNotes.sort((a, b) => b.downloadCount - a.downloadCount);
                break;
            case 'rating':
                filteredNotes.sort((a, b) => b.averageRating - a.averageRating);
                break;
            default:
                break;
        }

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedNotes = filteredNotes.slice(startIndex, endIndex);

        res.json({
            success: true,
            data: {
                notes: paginatedNotes,
                totalCount: filteredNotes.length,
                totalPages: Math.ceil(filteredNotes.length / limit),
                currentPage: parseInt(page),
                hasNext: endIndex < filteredNotes.length,
                hasPrev: startIndex > 0
            }
        });

    } catch (error) {
        console.error('Get notes error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/notes/:id
// @desc    Get single note by ID
// @access  Public
router.get('/:id', (req, res) => {
    try {
        const noteId = parseInt(req.params.id);
        const note = notes.find(note => note.id === noteId);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        res.json({
            success: true,
            data: { note }
        });

    } catch (error) {
        console.error('Get note error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/notes
// @desc    Create new note
// @access  Private (requires authentication)
router.post('/', upload.single('file'), (req, res) => {
    try {
        // Validate input
        const { error, value } = noteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required'
            });
        }

        const { title, description, subject, tags } = value;

        // Create new note
        const newNote = {
            id: notes.length + 1,
            title,
            description,
            subject,
            author: {
                id: 1, // Replace with authenticated user ID
                name: 'Current User',
                avatar: 'https://ui-avatars.com/api/?name=Current+User&background=3B82F6&color=fff'
            },
            uploadDate: new Date().toISOString(),
            downloadCount: 0,
            averageRating: 0,
            reviewCount: 0,
            fileType: path.extname(req.file.originalname).slice(1),
            fileSize: req.file.size,
            fileName: req.file.filename,
            filePath: req.file.path,
            tags: tags || [],
            thumbnail: `https://via.placeholder.com/300x400/3B82F6/FFFFFF?text=${encodeURIComponent(title)}`
        };

        notes.push(newNote);

        res.status(201).json({
            success: true,
            message: 'Note uploaded successfully',
            data: { note: newNote }
        });

    } catch (error) {
        console.error('Upload note error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/notes/:id/download
// @desc    Download note file
// @access  Public
router.post('/:id/download', (req, res) => {
    try {
        const noteId = parseInt(req.params.id);
        const note = notes.find(note => note.id === noteId);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        // Increment download count
        note.downloadCount += 1;

        res.json({
            success: true,
            message: 'Download started',
            data: {
                downloadUrl: `/api/notes/${noteId}/file`,
                fileName: note.fileName
            }
        });

    } catch (error) {
        console.error('Download note error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/notes/:id/rate
// @desc    Rate a note
// @access  Private
router.post('/:id/rate', (req, res) => {
    try {
        const noteId = parseInt(req.params.id);
        const { rating, review } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        const note = notes.find(note => note.id === noteId);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        // Simple rating calculation (in real app, store individual ratings)
        const currentTotal = note.averageRating * note.reviewCount;
        note.reviewCount += 1;
        note.averageRating = (currentTotal + rating) / note.reviewCount;

        res.json({
            success: true,
            message: 'Rating submitted successfully',
            data: {
                averageRating: note.averageRating,
                reviewCount: note.reviewCount
            }
        });

    } catch (error) {
        console.error('Rate note error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   DELETE /api/notes/:id
// @desc    Delete note
// @access  Private (only note author or admin)
router.delete('/:id', (req, res) => {
    try {
        const noteId = parseInt(req.params.id);
        const noteIndex = notes.findIndex(note => note.id === noteId);

        if (noteIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        notes.splice(noteIndex, 1);

        res.json({
            success: true,
            message: 'Note deleted successfully'
        });

    } catch (error) {
        console.error('Delete note error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router;
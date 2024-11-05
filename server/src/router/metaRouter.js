import express from 'express';
import {
    createMeta,
    getAllMeta,
    getMetaById,
    updateMeta,
    deleteMeta
} from '../controller/metaController';  // Import the controllers

const router = express.Router();

// Route to create a new Meta record
router.post('/meta', createMeta);

// Route to get all Meta records
router.get('/meta', getAllMeta);

// Route to get a single Meta record by ID
router.get('/meta/:id', getMetaById);

// Route to update a Meta record by ID
router.put('/meta/:id', updateMeta);

// Route to delete a Meta record by ID
router.delete('/meta/:id', deleteMeta);

export default router;

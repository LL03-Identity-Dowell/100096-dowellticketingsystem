import express from 'express';
import {
    createMeta,
    getAllMeta,
    getMetaById,
    updateMeta,
    deleteMeta
} from '../controller/metaController';  // Import the controllers

const metaRoutes = express.Router();

// Route to create a new Meta record
metaRoutes.post('/', createMeta);

// Route to get all Meta records
metaRoutes.get('/', getAllMeta);

// Route to get a single Meta record by ID
metaRoutes.get('/:id', getMetaById);

// Route to update a Meta record by ID
metaRoutes.put('/:id', updateMeta);

// Route to delete a Meta record by ID
metaRoutes.delete('/:id', deleteMeta);

export default metaRoutes;

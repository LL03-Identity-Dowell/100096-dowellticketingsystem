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
metaRoutes.post('/meta', createMeta);

// Route to get all Meta records
metaRoutes.get('/meta', getAllMeta);

// Route to get a single Meta record by ID
metaRoutes.get('/meta/:id', getMetaById);

// Route to update a Meta record by ID
metaRoutes.put('/meta/:id', updateMeta);

// Route to delete a Meta record by ID
metaRoutes.delete('/meta/:id', deleteMeta);

export default metaRoutes;

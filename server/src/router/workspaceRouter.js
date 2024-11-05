import express from 'express';
import * as workspaceController from '../controller/workspaceController';

const router = express.Router();

// Create a new workspace
router.post('/workspaces', workspaceController.createWorkspace);

// Get all workspaces
router.get('/workspaces', workspaceController.getAllWorkspaces);

// Get a workspace by ID
router.get('/workspaces/:id', workspaceController.getWorkspaceById);

// Update a workspace by ID
router.put('/workspaces/:id', workspaceController.updateWorkspace);

// Delete a workspace by ID
router.delete('/workspaces/:id', workspaceController.deleteWorkspace);

// Add a room to a workspace
router.post('/workspaces/:workspaceId/rooms', workspaceController.addRoomToWorkspace);

// Get all rooms in a specific workspace
router.get('/workspaces/:workspaceId/rooms', workspaceController.getRoomsInWorkspace);

export default router;

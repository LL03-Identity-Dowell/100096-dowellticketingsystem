import express from 'express';
import * as workspaceController from '../controller/workspaceController';

const workspaceRoutes = express.Router();

// Create a new workspace
workspaceRoutes.post('/workspaces', workspaceController.createWorkspace);

// Get all workspaces
workspaceRoutes.get('/workspaces', workspaceController.getAllWorkspaces);

// Get a workspace by ID
workspaceRoutes.get('/workspaces/:id', workspaceController.getWorkspaceById);

// Update a workspace by ID
workspaceRoutes.put('/workspaces/:id', workspaceController.updateWorkspace);

// Delete a workspace by ID
workspaceRoutes.delete('/workspaces/:id', workspaceController.deleteWorkspace);

// Add a room to a workspace
workspaceRoutes.post('/workspaces/:workspaceId/rooms', workspaceController.addRoomToWorkspace);

// Get all rooms in a specific workspace
workspaceRoutes.get('/workspaces/:workspaceId/rooms', workspaceController.getRoomsInWorkspace);

export default workspaceRoutes;

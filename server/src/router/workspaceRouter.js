import express from 'express';
import * as workspaceController from '../controller/workspaceController';

const workspaceRoutes = express.Router();

// Create a new workspace
workspaceRoutes.post('/', workspaceController.createWorkspace);  // POST /workspaces

// Get all workspaces
workspaceRoutes.get('/', workspaceController.getAllWorkspaces);  // GET /workspaces

// Get a workspace by ID
workspaceRoutes.get('/:id', workspaceController.getWorkspaceById);  // GET /workspaces/:id

// Update a workspace by ID
workspaceRoutes.put('/:id', workspaceController.updateWorkspace);  // PUT /workspaces/:id

// Delete a workspace by ID
workspaceRoutes.delete('/:id', workspaceController.deleteWorkspace);  // DELETE /workspaces/:id

// Add a room to a workspace
workspaceRoutes.post('/:workspaceId/rooms', workspaceController.addRoomToWorkspace);  // POST /workspaces/:workspaceId/rooms

// Get all rooms in a specific workspace
workspaceRoutes.get('/:workspaceId/rooms', workspaceController.getRoomsInWorkspace);  // GET /workspaces/:workspaceId/rooms

export default workspaceRoutes;

import Workspace from '../models/workspaceModel.js';  // Your Workspace model
import Room from '../models/roomModel.js';  // Your Room model

// Create a new workspace
export const createWorkspace = async (req, res) => {
    const { workspace_name, location, capacity, api_key, org_id, id } = req.body;

    // Manual validation
    if (!workspace_name || !location || !capacity) {
        return res.status(400).json({ success: false, message: 'Workspace name, location, and capacity are required' });
    }

    if (typeof capacity !== 'number') {
        return res.status(400).json({ success: false, message: 'Capacity must be a number' });
    }

    try {
        const newWorkspace = new Workspace({
            workspace_name,
            location,
            capacity,
            api_key,
            org_id,
            id
        });

        await newWorkspace.save();
        return res.status(201).json({ success: true, data: newWorkspace });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all workspaces
export const getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find();
        return res.status(200).json({ success: true, data: workspaces });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single workspace by ID
export const getWorkspaceById = async (req, res) => {
    const { id } = req.params;

    try {
        const workspace = await Workspace.findById(id);
        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }
        return res.status(200).json({ success: true, data: workspace });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update a workspace by ID
export const updateWorkspace = async (req, res) => {
    const { id } = req.params;
    const { workspace_name, location, capacity } = req.body;

    // Manual validation
    if (!workspace_name || !location || !capacity) {
        return res.status(400).json({ success: false, message: 'Workspace name, location, and capacity are required' });
    }

    if (typeof capacity !== 'number') {
        return res.status(400).json({ success: false, message: 'Capacity must be a number' });
    }

    try {
        const updatedWorkspace = await Workspace.findByIdAndUpdate(
            id,
            { workspace_name, location, capacity },
            { new: true }
        );
        if (!updatedWorkspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }
        return res.status(200).json({ success: true, data: updatedWorkspace });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a workspace by ID
export const deleteWorkspace = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedWorkspace = await Workspace.findByIdAndDelete(id);
        if (!deletedWorkspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }
        return res.status(200).json({ success: true, message: 'Workspace deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Add a room to a workspace
export const addRoomToWorkspace = async (req, res) => {
    const { workspaceId } = req.params;
    const { room_name } = req.body;

    // Manual validation
    if (!room_name) {
        return res.status(400).json({ success: false, message: 'Room name is required' });
    }

    try {
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        const newRoom = new Room({
            room_name,
            workspace_id: workspace._id
        });

        await newRoom.save();
        return res.status(201).json({ success: true, data: newRoom });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all rooms in a workspace
export const getRoomsInWorkspace = async (req, res) => {
    const { workspaceId } = req.params;

    try {
        const rooms = await Room.find({ workspace_id: workspaceId });
        return res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

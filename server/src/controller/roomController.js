import Room from "../models/roomModel.js";
import Workspace from "../models/workspaceModel.js";  // Assuming Workspace model is in models/Workspace

// Create a new room
export const createRoom = async (req, res) => {
    const { room_name, workspace_id } = req.body;

    if (!room_name || !workspace_id) {
        return res.status(400).json({ success: false, message: "Room name and workspace ID are required" });
    }

    try {
        // Check if workspace exists
        const workspace = await Workspace.findById(workspace_id);
        if (!workspace) {
            return res.status(404).json({ success: false, message: "Workspace not found" });
        }

        const newRoom = new Room({
            room_name,
            workspace_id
        });

        await newRoom.save();
        return res.status(201).json({ success: true, data: newRoom });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all rooms in a workspace
export const getRooms = async (req, res) => {
    const { workspace_id } = req.params;

    try {
        const rooms = await Room.find({ workspace_id });
        return res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get a specific room by ID
export const getRoomById = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await Room.findById(id).populate('workspace_id');  // Populating the workspace details
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        return res.status(200).json({ success: true, data: room });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update room details
export const updateRoom = async (req, res) => {
    const { id } = req.params;
    const { room_name, workspace_id } = req.body;

    try {
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        room.room_name = room_name || room.room_name;
        room.workspace_id = workspace_id || room.workspace_id;

        await room.save();
        return res.status(200).json({ success: true, data: room });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a room
export const deleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        await room.remove();
        return res.status(200).json({ success: true, message: "Room deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

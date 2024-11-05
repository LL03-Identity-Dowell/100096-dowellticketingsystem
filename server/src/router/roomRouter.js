import express from "express";
import {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from "../controller/roomController";  // Import the Room controller

const roomRoutes = express.Router();

// Route for creating a new room
roomRoutes.post("/rooms", createRoom);

// Route to get all rooms in a workspace
roomRoutes.get("/rooms/:workspace_id", getRooms);

// Route to get a specific room by ID
roomRoutes.get("/rooms/:id", getRoomById);

// Route to update a room by ID
roomRoutes.put("/rooms/:id", updateRoom);

// Route to delete a room by ID
roomRoutes.delete("/rooms/:id", deleteRoom);

export default roomRoutes;

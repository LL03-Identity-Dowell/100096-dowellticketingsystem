import express from "express";
import {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from "../controller/roomController.js";  // Import the Room controller

const roomRoutes = express.Router();

// Route for creating a new room
roomRoutes.post("/", createRoom);  // POST /rooms

// Route to get all rooms in a workspace (we will use :workspace_id in the path)
roomRoutes.get("/:workspace_id", getRooms);  // GET /rooms/:workspace_id

// Route to get a specific room by ID
roomRoutes.get("/:id", getRoomById);  // GET /rooms/:id

// Route to update a room by ID
roomRoutes.put("/:id", updateRoom);  // PUT /rooms/:id

// Route to delete a room by ID
roomRoutes.delete("/:id", deleteRoom);  // DELETE /rooms/:id

export default roomRoutes;

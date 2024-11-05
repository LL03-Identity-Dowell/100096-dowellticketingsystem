import express from "express";
import {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from "../controllers/roomController";  // Import the Room controller

const router = express.Router();

// Route for creating a new room
router.post("/rooms", createRoom);

// Route to get all rooms in a workspace
router.get("/rooms/:workspace_id", getRooms);

// Route to get a specific room by ID
router.get("/rooms/:id", getRoomById);

// Route to update a room by ID
router.put("/rooms/:id", updateRoom);

// Route to delete a room by ID
router.delete("/rooms/:id", deleteRoom);

export default router;

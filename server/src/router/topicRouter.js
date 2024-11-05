import express from "express";
import {
    createTopic,
    getTopics,
    getTopicById,
    updateTopic,
    deleteTopic
} from "../controller/topicController";  // Import the Topic controller

const router = express.Router();

// Route for creating a new topic
router.post("/topics", createTopic);

// Route to get all topics in a workspace
router.get("/topics/:workspace_id", getTopics);

// Route to get a specific topic by ID
router.get("/topics/:id", getTopicById);

// Route to update a topic by ID
router.put("/topics/:id", updateTopic);

// Route to delete a topic by ID
router.delete("/topics/:id", deleteTopic);

export default router;

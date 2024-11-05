import express from "express";
import {
    createTopic,
    getTopics,
    getTopicById,
    updateTopic,
    deleteTopic
} from "../controller/topicController";  // Import the Topic controller

const topicRoutes = express.Router();

// Route for creating a new topic
topicRoutes.post("/topics", createTopic);

// Route to get all topics in a workspace
topicRoutes.get("/topics/:workspace_id", getTopics);

// Route to get a specific topic by ID
topicRoutes.get("/topics/:id", getTopicById);

// Route to update a topic by ID
topicRoutes.put("/topics/:id", updateTopic);

// Route to delete a topic by ID
topicRoutes.delete("/topics/:id", deleteTopic);

export default topicRoutes;

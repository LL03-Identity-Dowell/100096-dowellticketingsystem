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
topicRoutes.post("/", createTopic);

// Route to get all topics in a workspace
topicRoutes.get("/:workspace_id", getTopics);

// Route to get a specific topic by ID
topicRoutes.get("/:id", getTopicById);

// Route to update a topic by ID
topicRoutes.put("/:id", updateTopic);

// Route to delete a topic by ID
topicRoutes.delete("/:id", deleteTopic);

export default topicRoutes;

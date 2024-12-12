import Topic from "../models/topicModel.js";  // Assuming the Topic model is in models/Topic
import Workspace from "../models/workspaceModel.js";  // Assuming the Workspace model is in models/Workspace
import Room from "../models/roomModel.js";  // Assuming the Room model is in models/Room

// Create a new topic
export const createTopic = async (req, res) => {
    const { workspace_id, name } = req.body;

    if (!workspace_id || !name) {
        return res.status(400).json({ success: false, message: "Workspace ID and topic name are required" });
    }

    try {
        // Check if workspace exists
        const workspace = await Workspace.findById(workspace_id);
        if (!workspace) {
            return res.status(404).json({ success: false, message: "Workspace not found" });
        }

        // Check if room exists
        // const room = await Room.findOne({ workspace_id, room_name });
        // if (!room) {
        //     return res.status(404).json({ success: false, message: "Room not found" });
        // }

        const newTopic = new Topic({
            name,
            workspace_id
        });

        await newTopic.save();
        return res.status(201).json({ success: true, data: newTopic });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all topics in a workspace
export const getTopics = async (req, res) => {
    const { workspace_id } = req.params;

    try {
        const topics = await Topic.find({ workspace_id });
        return res.status(200).json({ success: true, data: topics });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get a specific topic by ID
export const getTopicById = async (req, res) => {
    const { id } = req.params;

    try {
        const topic = await Topic.findById(id).populate('workspace_id');  // Populate workspace details
        if (!topic) {
            return res.status(404).json({ success: false, message: "Topic not found" });
        }

        return res.status(200).json({ success: true, data: topic });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update a topic's details
export const updateTopic = async (req, res) => {
    const { id } = req.params;
    const { workspace_id, name } = req.body;

    try {
        const topic = await Topic.findById(id);
        if (!topic) {
            return res.status(404).json({ success: false, message: "Topic not found" });
        }

        topic.name = name || topic.name;
        topic.workspace_id = workspace_id || topic.workspace_id;

        await topic.save();
        return res.status(200).json({ success: true, data: topic });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a topic
export const deleteTopic = async (req, res) => {
    const { id } = req.params;

    try {
        const topic = await Topic.findById(id);
        if (!topic) {
            return res.status(404).json({ success: false, message: "Topic not found" });
        }

        await topic.remove();
        return res.status(200).json({ success: true, message: "Topic deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

import mongoose from 'mongoose';

// Define the Workspace Schema
const workspaceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    org_id: {
        type: String,
        required: true
    },
    api_key: {
        type: String,
        required: true
    },
    workspace_name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        default: 0,  // Optional, for physical workspaces, set the number of people it can accommodate
    },
    // You can add any other fields related to the workspace like facilities, type, etc.
}, {
    timestamps: true  // Automatically add createdAt and updatedAt timestamps
});

// Export the Workspace model
export default mongoose.model('Workspace', workspaceSchema);

import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';  // Correctly import the uuid module

// Define the Room Schema
const roomSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true, // Ensuring that the UUID is unique
        default: uuidv4  // Correctly using uuid.v4() here
    },
    room_name: {
        type: String,
        required: true,  // Room name is mandatory
        trim: true  // Remove any extra spaces around the name
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,  // Referencing the Workspace model
        ref: 'Workspace',  // This will link to the 'Workspace' collection
        required: true  // The workspace_id must exist and is mandatory
    },
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Export the Room model
export default mongoose.model('Room', roomSchema);

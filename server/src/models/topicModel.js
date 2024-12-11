import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';  // Correctly import the uuid module

const topicSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4  // Correctly using uuid.v4() here
    },
    // room_name: {
    //     type: String,
    //     required: true
    // },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',  // It's good practice to define the ref for population
        required: true
    },
}, {
    timestamps: true  // Automatically create createdAt and updatedAt fields
});

// Export the model
export default mongoose.model('Topic', topicSchema);

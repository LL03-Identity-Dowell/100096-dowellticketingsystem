import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema(
    {
        workspace_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Workspace',  // Refers to the Workspace model
        },
        api_key: {
            type: String,
            required: true,
            unique: true,  // Ensure that the API key is unique
        },
        waiting_time: {
            type: Number,
            default: 0,  // Default value for waiting_time
        },
        operation_time: {
            type: Number,
            default: 0,  // Default value for operation_time
        },
    },
    {
        timestamps: true,  // Automatically add createdAt and updatedAt
    }
);

export default mongoose.model('Meta', metaSchema);

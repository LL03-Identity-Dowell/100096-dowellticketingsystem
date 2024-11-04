import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
    org_id: {
        type: String,
        required: true
    },
    api_key: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Workspace', workspaceSchema);

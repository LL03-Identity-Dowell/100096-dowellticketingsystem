import mongoose from "mongoose";


const WorkspaceSchema = new mongoose.Schema({
    org_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Organization'
    },
    api_key: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model('Workspace', WorkspaceSchema);
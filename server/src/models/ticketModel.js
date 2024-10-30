import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true
        },
        link_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Link',
            required: true
        },
        workspace_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true
        },
        department: {
            type: String,
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    
        public_id: {
            type: String,
            unique: true
        },
        product: {
            type: String,
            required: true,
            trim: true
        },
        display_name: {
            type: String
        },
        line_manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'lineManagerModel',
            required: true
        },
        is_closed: {
            type: Boolean,
            required: true,
            default: false
        },
        waiting_time: {
            type: Number,
            default: 0
        },
        document_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        }
    },
    {
        timestamps: true 
    }
);

export default mongoose.model('Ticket', ticketSchema);

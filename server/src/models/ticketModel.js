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
        public_id: {
            type: String,
            unique: true,
            index: true 
        },
        product: {
            type: String,
            required: true,
            trim: true
        },
        display_name: {
            type: String
        },
        line_manager: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'lineManagerModel'
        }],
        is_closed: {
            type: Boolean,
            required: true,
            default: false
        },
        waiting_time: {
            type: Number,
            default: 0
        },
        documents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        }]
    },
    {
        timestamps: true 
    }
);

export default mongoose.model('Ticket', ticketSchema);

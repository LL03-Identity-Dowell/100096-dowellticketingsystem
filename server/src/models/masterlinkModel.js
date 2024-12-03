import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const masterlinkSchema = new mongoose.Schema(
    {
        link_id: {
            type: String,
            required: true,
            unique: true,
            default: uuidv4
        },
        number_of_links: {
            type: Number,
            required: true
        },
        available_links: {
            type: Number,
            required: true,
            default: 0
        },
        product_distribution: {
            type: Object,
            required: true
        },
        usernames: {
            type: [String],
            required: true
        },
        is_active: {
            type: Boolean,
            required: true,
            default: false
        },
        master_link: {
            type: String,
            required: true
        },
        workspace_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Workspace',
            required: true
        },
        api_key: {
            type: String,
            required: true
        },
        link: { 
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Masterlink', masterlinkSchema);

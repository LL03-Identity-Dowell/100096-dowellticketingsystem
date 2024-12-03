import mongoose from 'mongoose';

const lineManagerSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        user_name: {
            type: String,
            ref: 'User',
            required: true
        },
        ticket_ids: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ticket'
            }
        ],
        positions_in_a_line: Number,
        average_serving_time: Number,
        ticket_count: {
            type: Number,
            default: 0
        },
        is_active: {
            type: Boolean,
            default: true
        },
        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('LineManager', lineManagerSchema);

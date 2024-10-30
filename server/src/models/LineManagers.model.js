import mongoose from "mongoose"

const lineManagerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: uuid.v4()
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ticket_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },

    position_in_a_line: {
        type: Number,
        required: true,
        default: 0
    },
    average_serving_time: {
        type: Number,
        required: true,
        default: 0
    },
    ticket_count: {
        type: Number,
        required: true,
        default: 0
    },
    is_active: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true  // automatically adds createdAt and updatedAt fields
})

export default mongoose.model('LineManager', lineManagerSchema)

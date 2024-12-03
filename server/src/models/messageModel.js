import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    ticket_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    topic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    },
    messages: [
        {
            text: String,
            timestamp: { type: Date, default: Date.now },
            author: String,
            reply_to: String
        }
    ],
    last_time_of_access: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

export default mongoose.model('Message', messageSchema)

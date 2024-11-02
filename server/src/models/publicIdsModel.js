import mongoose from 'mongoose'

const publicIdsSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['master', 'meta'],
        required: true
    },
    available_ids: [String],
    used_ids: [
        {
            public_id: String,
            availability_status: {
                type: Boolean,
                default: false
            },
            ticket_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ticket'
            }
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model('PublicIds', publicIdsSchema)

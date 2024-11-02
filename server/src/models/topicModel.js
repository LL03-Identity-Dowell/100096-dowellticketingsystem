import mongoose from "mongoose"

const topicSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: uuid.v4()
    },
    room_name: {
        type: String,
        required: true
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Topic', topicSchema)

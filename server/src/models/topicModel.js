import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'
const topicSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4
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



export default mongoose.model('topicModel', topicSchema);


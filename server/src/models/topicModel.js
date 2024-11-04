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

<<<<<<< HEAD
// module.exports = mongoose.model('topicModel', topicSchema)
export default mongoose.model('topicModel', topicSchema);
=======
module.exports = mongoose.model('Topic', topicSchema)
>>>>>>> 0fa2cf305d438dc5d340b6d35cd0e64ff1b36df0

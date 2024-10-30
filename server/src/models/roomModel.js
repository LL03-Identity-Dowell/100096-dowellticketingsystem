import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: uuid.v4()
    },
    room_name: {
        type: String,
        required: true,
        trim: true
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },

}, {
    timestamps: true
})

export default mongoose.model('Room', roomSchema)
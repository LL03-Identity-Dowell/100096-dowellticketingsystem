import mongoose from 'mongoose'

const metaSchema = new mongooose.Schema(
    {
        workspace_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Workspace'
        },
        api_key: {
            type: String,
            required: true,
            unique: true
        },
        waiting_time: {
            type: Number,
            default: 0
        },
        operation_time: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Meta', metaSchema)
import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Link', linkSchema);

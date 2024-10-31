import mongoose from "mongoose";

const masterlinkSchema = new mongooose.Schema({
    id: {
        type: String,
        required: true,
        unique: uuid.v4()
    },
    link_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link',
        required: true
    },
    no_of_links: {
        type: Number,
        required: true
    },
    available_links: {
        type: Number,
        required: true,
        default: 0
    },
    
    production_distribution: {
        type: String,
        required: true  
    },
    usernames: {
        type:String,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default: false
    },
    link: {
        type: String,
        required: true
    },
    masterlink: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongooose.model('Masterlink', masterlinkSchema)
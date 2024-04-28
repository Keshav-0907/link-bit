import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    originalLink: {
        type: String,
        required: true
    },
    shortLink: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    } 
}, {
    timestamps: true
})

const linkModel = mongoose.models.link || mongoose.model('link', linkSchema);
export default linkModel;
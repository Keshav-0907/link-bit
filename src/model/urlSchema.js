import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
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
    },
    useremail: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const urlModel =  mongoose.models.URL || mongoose.model('URL', urlSchema);
export default urlModel;
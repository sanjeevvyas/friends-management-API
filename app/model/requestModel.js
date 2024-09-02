import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.ObjectId,
        require: true
    },
    reciverId: {
        type: mongoose.Schema.ObjectId,
    },
    status: {
        type: String,
        enum: ["pending", "accept", "reject"],
        default: "pending"
    },
}, { timestamps: true, versionKey: false });
const request = mongoose.model("request", requestSchema);
export default request;
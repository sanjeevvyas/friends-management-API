import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        require: true
    },
    friendId: {
        type: mongoose.Schema.ObjectId,
    },
}, { timestamps: true, versionKey: false });
const friends = mongoose.model("friends", friendsSchema);
export default friends;
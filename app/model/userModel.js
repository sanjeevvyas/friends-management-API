import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        default: 'Active'
    },
}, { timestamps: true, versionKey: false });
const users = mongoose.model("users", usersSchema);
export default users;
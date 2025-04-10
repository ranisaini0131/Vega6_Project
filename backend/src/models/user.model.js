import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImage: { type: String },
        role: { type: String, default: "user" },
    }
);

export const User = mongoose.model('User', UserSchema);

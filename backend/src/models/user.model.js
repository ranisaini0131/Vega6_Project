import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImage: { type: String }
    }
);

export const User = mongoose.model('User', UserSchema);

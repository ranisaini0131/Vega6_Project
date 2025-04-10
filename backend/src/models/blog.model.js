import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{
        user: String,
        message: String,
        replies: [{ user: String, message: String }]
    }]
});

export const Blog = mongoose.model('Blog', BlogSchema);

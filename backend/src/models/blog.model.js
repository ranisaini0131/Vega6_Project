import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export const Blog = mongoose.model('Blog', BlogSchema);

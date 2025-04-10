import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        blogPost: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true
        },
        parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    });

export const Comment = mongoose.model('Comment', commentSchema);


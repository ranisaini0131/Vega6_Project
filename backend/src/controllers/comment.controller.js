import express from 'express';
import { Comment } from '../models/comment.model.js';

// Create a comment or reply
export const createComment = async (req, res) => {
    try {
        const comment = new Comment({
            blogPost: req.params.postId,
            parentComment: parentComment || null,
            content,
        });

        await comment.save();
        return res
            .status(201)
            .json({
                status: "success",
                message: "Comment created Successfully",
                data: comment
            });
    } catch (err) {
        return res
            .status(500)
            .json({
                status: "success",
                message: error.message
            });
    }
}

// Get all comments and replies for a post
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({ blogPost: req.params.postId })
            .sort({ createdAt: 1 })
            .lean();

        // Organize comments into nested format
        const commentMap = {};
        comments.forEach(comment => {
            comment.replies = [];
            commentMap[comment._id] = comment;
        });

        const rootComments = [];

        comments.forEach(comment => {
            if (comment.parentComment) {
                commentMap[comment.parentComment]?.replies.push(comment);
            } else {
                rootComments.push(comment);
            }
        });

        return res
            .status(200)
            .json({
                status: "success",
                rootComments
            });
    } catch (err) {
        res.
            status(500).
            json({ error: err.message });
    }
};

export default router;





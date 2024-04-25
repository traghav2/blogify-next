import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },

    password: {
        type: String,
    },

    image: {
        type: String,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    },

    username: {
        type: String,
        required: true,
    },

}, { timestamps: true })

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    comment: {
        type: String,
        required: true,
    },

    displayPic: {
        type: String,
    },

    postId: {
        type: String,
        required: true,
    },

    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },

    replies: [
        {
            username: {
                type: String,
                required: true,
            },
        
            comment: {
                type: String,
                required: true,
            },
        
            displayPic: {
                type: String,
            },
        
            commentId: {
                type: String,
                required: true,
            },
        
            likes: {
                type: Number,
                default: 0
            },
            dislikes: {
                type: Number,
                default: 0
            },
            createdAt: {
                type: Date,
                required: true,
            }
        },
    ]

}, { timestamps: true })

const feedbackScehma = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },

    feedback:{
        type: String,
        required: true,
    }
}, { timestamps: true })

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
export const Comment = mongoose.models?.Comment || mongoose.model("Comment", commentSchema);
export const Feedback = mongoose.models?.Feedback || mongoose.model("Feedback", feedbackScehma);
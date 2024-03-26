"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    isValidUserComment: {
        type: Boolean,
        required: true,
    },
    Date: String,
}, { timestamps: true });
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.default = Comment;

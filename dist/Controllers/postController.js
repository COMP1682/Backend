"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getComments = exports.addComment = exports.likePost = exports.deletePost = exports.editPost = exports.getUserPosts = exports.getFeedPosts = exports.createPost = void 0;
const PostModel_1 = __importDefault(require("../Models/PostModel"));
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const CommentModel_1 = __importDefault(require("../Models/CommentModel"));
const createPost = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { description, picturePath } = JSON.parse(req.body);
        const user = await UserModel_1.default.findById(userId);
        console.log("userId", userId);
        if (user == null) {
            return res.status(200).json({ message: "User Not Found" });
        }
        const newPost = new PostModel_1.default({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user === null || user === void 0 ? void 0 : user.picturePath,
            picturePath,
            likes: {},
        });
        await newPost.save();
        const post = await PostModel_1.default.find();
        res.status(201).json(post);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
};
exports.createPost = createPost;
const getFeedPosts = async (req, res, next) => {
    try {
        const post = await PostModel_1.default.find().sort({ _id: -1 });
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
exports.getFeedPosts = getFeedPosts;
const getUserPosts = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const post = await PostModel_1.default.find({ userId });
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
exports.getUserPosts = getUserPosts;
const editPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { data, userId } = req.body;
        const post = await PostModel_1.default.findByIdAndUpdate({ _id: id, userId: userId }, data, { new: true });
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
exports.editPost = editPost;
const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { data, userId } = req.body;
        const checkPost = await PostModel_1.default.findById({ _id: id });
        if (userId != (checkPost === null || checkPost === void 0 ? void 0 : checkPost.userId)) {
            res.status(400).json({ message: "Wrong user" });
        }
        else {
            const comment = await CommentModel_1.default.deleteMany({ postId: id });
            const post = await PostModel_1.default.findByIdAndDelete({ _id: id, userId: userId });
            res.status(200).json(post);
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
exports.deletePost = deletePost;
const likePost = async (req, res, next) => {
    var _a, _b, _c;
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await PostModel_1.default.findById(id);
        if (post == null) {
            return res.status(404).json({ message: "post is not found" });
        }
        const isLiked = (_a = post.likes) === null || _a === void 0 ? void 0 : _a.get(userId);
        if (isLiked) {
            (_b = post.likes) === null || _b === void 0 ? void 0 : _b.delete(userId);
        }
        else {
            (_c = post.likes) === null || _c === void 0 ? void 0 : _c.set(userId, true);
        }
        const updatedPost = await PostModel_1.default.findByIdAndUpdate(id, { likes: post === null || post === void 0 ? void 0 : post.likes }, { new: true });
        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
exports.likePost = likePost;
const addComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, comment } = JSON.parse(req.body);
        const user = await UserModel_1.default.findById(userId);
        const post = await PostModel_1.default.findById(id);
        const fullName = user === null || user === void 0 ? void 0 : user.firstName.concat(" ".concat(user === null || user === void 0 ? void 0 : user.lastName));
        if (post == null) {
            return res.status(404).json({ message: "post is not found" });
        }
        const newComment = new CommentModel_1.default({
            userId,
            userName: fullName,
            postId: id,
            comment: comment,
            isValidUserComment: false,
            Date: new Date().toLocaleDateString(),
        });
        await newComment.save();
        res.status(200).json({ message: "Comment is upload successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.addComment = addComment;
const getComments = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await CommentModel_1.default.find({ postId });
        res.status(200).json(comments);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getComments = getComments;
const deleteComment = async (req, res, next) => {
    try {
        const { deleteCommentId } = req.params;
        console.log("commentid", deleteCommentId);
        const { userId, timeComment } = req.body;
        const checkComment = await CommentModel_1.default.findById(deleteCommentId);
        if (checkComment == null) {
            return res.status(404).json({ message: "comment is not found" });
        }
        const post = await PostModel_1.default.findById(checkComment.postId);
        if (post == null) {
            return res.status(404).json({ message: "post is not found" });
        }
        const comment = await CommentModel_1.default.findByIdAndDelete({ _id: deleteCommentId });
        await post.save();
        return res.status(200).json({ message: "user deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.deleteComment = deleteComment;

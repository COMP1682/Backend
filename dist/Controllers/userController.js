"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFriends = exports.addRemoveFriend = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUserById = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const createUser = async (req, res, next) => {
    try {
        console.log("body:", req.body);
        const data = req.body;
        const user = await UserModel_1.default.create(data);
        console.log("user", user);
        return res
            .status(200)
            .json({ message: "User created successfully", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.createUser = createUser;
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel_1.default.findById(id);
        return res.status(200).json({ message: "Get user!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getUserById = getUserById;
const getUser = async (req, res, next) => {
    try {
        const user = await UserModel_1.default.find({});
        return res.status(200).json({ message: "All user!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const user = await UserModel_1.default.findByIdAndUpdate({ _id: id }, data, { new: true });
        return res
            .status(200)
            .json({ message: "User updated successfully!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isDeleted = await UserModel_1.default.findByIdAndDelete(id);
        if (!isDeleted)
            throw new Error("Failed to delete todo");
        return res.status(200).json({ message: "user deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.deleteUser = deleteUser;
const addRemoveFriend = async (req, res, next) => {
    var _a, _b, _c, _d;
    try {
        const { id, friendId } = req.params;
        const user = await UserModel_1.default.findById(id);
        const friend = await UserModel_1.default.findById(friendId);
        if (user == null || friend == null) {
            return res.status(200).json({ message: "user not found" });
        }
        if ((_a = user.friends) === null || _a === void 0 ? void 0 : _a.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = (_b = friend.friends) === null || _b === void 0 ? void 0 : _b.filter((id) => id !== id);
        }
        else {
            (_c = user.friends) === null || _c === void 0 ? void 0 : _c.push(friendId);
            (_d = friend.friends) === null || _d === void 0 ? void 0 : _d.push(id);
        }
        await user.save();
        await friend.save();
        return res.status(200).json({ message: "add or remove friend successfully" });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
exports.addRemoveFriend = addRemoveFriend;
const getUserFriends = async (req, res, next) => {
    var _a;
    try {
        const { id } = req.params;
        const user = await UserModel_1.default.findById(id);
        const friendArray = new Array;
        if (user == null) {
            return res.status(200).json({ message: "user not found" });
        }
        (_a = user.friends) === null || _a === void 0 ? void 0 : _a.forEach(async (friendId) => {
            console.log("friendId = ", friendId);
            if (UserModel_1.default.findById(friendId) != null) {
                const friend = await UserModel_1.default.findById(friendId).then(res.json);
                console.log("data friend", friend);
                friendArray.push(friend);
            }
        });
        console.log("friendList:", friendArray);
        return res.status(200).json({ data: friendArray });
    }
    catch (err) {
        return res.status(404).json({ message: err.message });
    }
};
exports.getUserFriends = getUserFriends;

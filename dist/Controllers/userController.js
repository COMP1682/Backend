"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFriends = exports.addRemoveFriend = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUserById = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const createUser = async (req, res, next) => {
    try {
        console.log("body:", req.body);
        const { firstName, lastName, email, password, picturePath, friends, location, } = req.body;
        const salt = await bcrypt_1.default.genSalt();
        const passwordHash = await bcrypt_1.default.hash(password, salt);
        const newUser = new UserModel_1.default({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
        });
        const user = await UserModel_1.default.create(newUser);
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
        const responseUser = new UserModel_1.default({
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            emai: user === null || user === void 0 ? void 0 : user.email,
            picturePath: user === null || user === void 0 ? void 0 : user.picturePath,
            friends: user === null || user === void 0 ? void 0 : user.friends,
            location: user === null || user === void 0 ? void 0 : user.location,
        });
        return res.status(200).json({ message: "Get user!", data: responseUser });
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
        const data = JSON.parse(req.body);
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
            throw new Error("Failed to delete User");
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
    try {
        const { id } = req.params;
        const user = await UserModel_1.default.findById(id);
        const friendArray = [];
        if (user == null) {
            return res.status(200).json({ message: "user not found" });
        }
        if (user.friends != null) {
            for (const friendId of user.friends) {
                const friend = await UserModel_1.default.findById(friendId);
                friendArray.push(friend);
                console.log("friend in loop", friend);
            }
        }
        console.log(friendArray);
        return res.status(200).json({ data: friendArray });
    }
    catch (err) {
        return res.status(404).json({ message: err.message });
    }
};
exports.getUserFriends = getUserFriends;

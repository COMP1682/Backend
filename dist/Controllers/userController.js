"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateToDo = exports.getUser = exports.getUserById = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        console.log("Data", data);
        var user = await UserModel_1.default.create(data);
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
        const { _id } = req.params;
        var user = await UserModel_1.default.findById({ _id });
        return res.status(200).json({ message: "All user!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getUserById = getUserById;
const getUser = async (req, res, next) => {
    try {
        var user = await UserModel_1.default.find({});
        return res.status(200).json({ message: "All todos!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getUser = getUser;
const updateToDo = async (req, res, next) => {
    try {
        const { id } = req.params;
        var user = await UserModel_1.default.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        return res
            .status(200)
            .json({ message: "User updated successfully!", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.updateToDo = updateToDo;
// export const deleteToDo: RequestHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     var isDeleted = await Todo.findByIdAndDelete(id);
//     if (!isDeleted) throw new Error("Failed to delete todo");
//     return res.status(200).json({ message: "Todo deleted successfully!" });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

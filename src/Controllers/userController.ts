import { RequestHandler } from "express";

import User, { userModel } from "../Models/UserModel";
import Friend, { friendModel } from "../Models/FriendModel";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data: userModel = req.body;
    console.log("Data", data);
    var user = await User.create(data);
    return res
      .status(200)
      .json({ message: "User created successfully", data: user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
    try {
      const {_id} = req.params;
      var user = await User.findById({_id});
      return res.status(200).json({ message: "All user!", data: user });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    var user = await User.find({});
    return res.status(200).json({ message: "All todos!", data: user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateToDo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var user = await User.findByIdAndUpdate({_id:id}, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "User updated successfully!", data: user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

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
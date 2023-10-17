import { RequestHandler } from "express";

import User from "../Models/UserModel";
import { finished } from "stream";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    console.log("body:",req.body)
    const data = req.body;
    const user = await User.create(data)
    console.log("user", user);
    return res
      .status(200)
      .json({ message: "User created successfully", data: user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
    try {
      const {id} = req.params;
      const user = await User.findById(id);
      return res.status(200).json({ message: "Get user!", data: user });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.find({});
    return res.status(200).json({ message: "All user!", data: user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await User.findByIdAndUpdate({_id:id}, data, { new: true });
    return res
      .status(200)
      .json({ message: "User updated successfully!", data: user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDeleted = await User.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete todo");
    return res.status(200).json({ message: "user deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const addRemoveFriend : RequestHandler = async (req, res, next) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if(user == null || friend == null)
    {
      return res.status(200).json({message: "user not found"})
    }
    if (user.friends?.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends?.filter((id) => id !== id);
    } 
    else {
      user.friends?.push(friendId);
      friend.friends?.push(id);
    }
    await user.save();
    await friend.save();

    return res.status(200).json({message:"add or remove friend successfully"});
  } catch (error : any) {
    return res.status(404).json({ message: error.message });
  }
};

export const getUserFriends : RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if(user == null)
    {
      return res.status(200).json({message:"user not found"}) 
    }

    const friends = await Promise.all(
      user.friends?.map((friendId) => User.findById(friendId))
    );
    return res.status(200).json({data:});
  } catch (err : any) {
    return res.status(404).json({ message: err.message });
  }
};
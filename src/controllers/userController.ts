import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

// /users - get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}).select("-__v");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// /users/:userId - get a single user along with their friends array and thought array
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate("thoughts") //populate thoughts data of that user
      .populate("friends") //populate friends data of that user
      .select("-__v"); // removed the version property field from the response
    if (!user) {
      res.status(404).json("User cant be found by that id");
      return;
    }
    res.status(200).json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};
// create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// update an existing user by id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) {
      res.status(404).json("User not found by that id");
      return;
    }
    res.status(200).json(user);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};
// delete a user and their associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    if (!user) {
      res.status(404).json("No user found by that id");
      return;
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } }); // delete the associated thoughts of the user
    res.status(200).json("User and their thoughts have been deleted");
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};
// add a friend to a user's friend list
// /users/userId/friends
export const addFriend = async (req: Request, res: Response) => {
  try {
    const friend = await User.findOne({ _id: req.params.friendId });
    if (!friend) {
      res.status(404).json("This user cant be found to be added as a friend");
      return;
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: friend._id } },
      { new: true } // return the updated document
    );
    if (!user) {
      res.status(404).json("The user cant be found by that id");
      return;
    }
    res.status(201).json(user);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};
// remove a friend
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const friend = await User.findOne({ _id: req.params.friendId });
    if (!friend) {
      res.status(404).json("friend not found by that id");
      return;
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: friend._id } },
      { new: true }
    );
    if (!user) {
      res.status(404).json("User not found by that id");
      return;
    }
    res
      .status(200)
      .json({ message: "The friend is successfully deleted", user });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};

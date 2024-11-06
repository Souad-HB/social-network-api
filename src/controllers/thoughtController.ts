import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

// get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get thought by id
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      res.status(404).json("No thought found by that id");
      return;
    }
    res.status(200).json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// create a thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      res.status(404).json("User not found by that id");
    }
    res.status(201).json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};
// update a thought by id
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json("Thought not found by that id");
      return;
    }
    res.status(200).json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};
// remove a thought by id
export const removeThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });
    if (!thought) {
      res.status(404).json("Thought cant be found by that id");
      return;
    }
    const user = await User.findOneAndUpdate(
      {
        thoughts: req.params.thoughtId,
      },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json("No user associated with that thought id was found");
      return;
    }
    res.status(200).json("Thought has been deleted");
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// create a reaction created in a single thought
// /thoughts/:thoughtId/reactions
export const createReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $addToSet: { reactions: req.body },
      },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json("Thought not found by that id");
      return;
    }
    res.status(200).json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// remove a reaction in a single thought
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json("No thought was found by that id");
      return;
    }
    res.status(200).json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

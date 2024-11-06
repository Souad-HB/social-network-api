import { Request, Response } from "express";
import { User, Thought } from "../models/index.js";

export const getAllThoughts = async(_req: Request, res: Response) => {
    try{ 
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}
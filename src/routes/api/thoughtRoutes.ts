import { Router } from "express";
import {
  createReaction,
  createThought,
  getAllThoughts,
  getSingleThought,
  removeReaction,
  removeThought,
  updateThought,
} from "../../controllers/thoughtController.js";

const router = Router();
// /thoughts/ - get all thoughts
router.get("/", getAllThoughts);

// /thoughts/:thoughtId
router.get("/:thoughtId", getSingleThought);

// /thoughts
router.post("/", createThought);

// /thoughts/:thoughId
router.put("/:thoughtId", updateThought);

// /thoughts/:thoughId
router.delete("/:thoughtId", removeThought);

// thoughts/:thoughtId/reactions
router.post("/:thoughtId/reactions", createReaction);

// thoughts/:thoughtId/reactions/reactionId
router.delete("/:thoughtId/reactions/:reactionId", removeReaction);

export default router;

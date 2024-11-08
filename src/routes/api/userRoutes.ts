import { Router } from "express";
const router = Router();

import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from "../../controllers/userController.js";

// /users - get all users
router.get("/", getAllUsers);

// /users/:userId - get user by id
router.get("/:userId", getSingleUser);

// /users - post a user
router.post("/", createUser);

// /users/:userId - update a user
router.put("/:userId", updateUser);

// /users/:userId - delete the user and their thoughts
router.delete("/:userId", deleteUser);

// /users/:userId/friends/:friendId - add a friend to a user's friends list
router.post("/:userId/friends/:friendId", addFriend);

// /users/:userId/friends/:friendId - remove a friend from a user's friends list
router.delete("/:userId/friends/:friendId", removeFriend);

export default router;

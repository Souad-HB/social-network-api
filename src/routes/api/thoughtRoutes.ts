import { Router } from "express";
import { getAllThoughts } from "../../controllers/thoughtController.js";

const router = Router();
// /thoughts/ - get all thoughts
router.get('/', getAllThoughts);


export default router;


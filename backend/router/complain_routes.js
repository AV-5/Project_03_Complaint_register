import express from "express";
import { createComplain,deleteComplain, setPriority, setStatus } from "../controller/complain_controller.js";
import authMiddleware from "../middleware/auth_middleware.js";
const router = express.Router();
router.post("/newComplain",authMiddleware, createComplain);
router.delete("/deleteComplain",authMiddleware, deleteComplain);
router.patch("/setPrority",authMiddleware, setPriority);
router.patch("/setStatus",authMiddleware, setStatus);
export default router;

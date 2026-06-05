import Complain from "../models/complain_model.js";
import { v4 as uuidv4 } from "uuid";

const createComplain = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }
        const complain = await Complain.create({
            title,
            description,
            complainid: uuidv4(),       // auto-generate task ID
            priority,
            dueDate,
            user: req.user.id,      // from auth middleware
        });

        res.status(201).json({
            success: true,
            message: "Complain registered successfully",
            complain
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering complain",
            error: error.message,
        });
    }
};
const deleteComplain = async (req, res) => {
    try {
        const { id } = req.body;
        const complain = await Complain.findOneAndDelete({
            _id: id,
            user: req.user.id,      // ensure task belongs to the logged-in user
        });

        if (!complain) {
            return res.status(404).json({
                success: false,
                message: "Complain not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Complain deleted successfully",
            complain
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting complain",
            error: error.message,
        });
    }
};
const setPriority = async (req, res) => {
    try {
        const { id } = req.body;
        const { priority } = req.body;              // priority from body, not params

        const validPriorities = ["low", "medium", "high"];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                message: "Priority must be low, medium, or high",
            });
        }

        const complain = await Complain.findOneAndUpdate(
            { _id: id, user: req.user.id },         // scoped to current user
            { priority },
            { new: true }                           // return updated document
        );

        if (!complain) {
            return res.status(404).json({
                success: false,
                message: "Complain not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Priority updated successfully",
            complain
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error setting priority",
            error: error.message,
        });
    }
};
const setStatus = async (req, res) => {
    try {
        const { id } = req.body;
        const { completed } = req.body;  // expects true or false

        if (typeof completed !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Completed must be a boolean (true or false)",
            });
        }

        const complain = await Complain.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { completed },
            { new: true }
        );

        if (!complain) {
            return res.status(404).json({
                success: false,
                message: "Complain not found",
            });
        }

        res.status(200).json({
            success: true,
            message: `Complain marked as ${completed ? "resolved" : "unresolved"}`,
            complain

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating complaint status",
            error: error.message,
        });
    }
};

export { createComplain,deleteComplain, setPriority, setStatus };



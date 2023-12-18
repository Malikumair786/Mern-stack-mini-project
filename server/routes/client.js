import Express from "express";
import {
  addMedicalTest,
  getMedicalTest,
  updateMedicalTest,
  deleteMedicalTest,
} from "../controllers/client.js";

const router = Express.Router();

// Existing routes

// New routes for medical tests
router.get("/medical-tests", getMedicalTest); // Get all medical tests
router.post("/medical-tests", addMedicalTest); // Add a new medical test
router.put("/medical-tests/:id", updateMedicalTest); // Update a medical test by ID
router.delete("/medical-tests/:id", deleteMedicalTest); // Delete a medical test by ID

export default router;

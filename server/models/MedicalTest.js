import mongoose from "mongoose";

const medicalTestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    name: { type: String, required: true },
    description: { type: String },
    // Add other relevant fields for a test category
  },
  price: { type: Number, required: true },
  description: { type: String },
  picture: { type: String }, // Assuming the picture will be stored as a URL or file path
});

// Sample Usage
const MedicalTest = mongoose.model("MedicalTest", medicalTestSchema); // Corrected the model name
export default MedicalTest;

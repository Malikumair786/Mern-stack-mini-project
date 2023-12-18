import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    testName: String,
    testType: String,
    testDescription: String,
    testCategory: String,
    testRating: Number,
    testSupply: Number,
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", TestSchema);

export default Test;

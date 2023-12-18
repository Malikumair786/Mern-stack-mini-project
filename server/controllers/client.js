import Product from "../models/Product.js";
import Test from "../models/Test.js";
import ProductStat from "../models/ProductStat.js";
// import TestStat from "../models/TestState.js";
import TestStat from "../models/TestStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
import MedicalTest from "../models/MedicalTest.js";

export const getMedicalTest = async (req, res) => {
  try {
    const medicalTests = await MedicalTest.find();
    res.status(200).json(medicalTests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addMedicalTest = async (req, res) => {
  try {
    const { name, category, price, description, picture } = req.body;

    // Assuming category is an object with name and description
    const newMedicalTest = new MedicalTest({
      name,
      category,
      price,
      description,
      picture,
    });

    const savedMedicalTest = await newMedicalTest.save();

    res.status(201).json(savedMedicalTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMedicalTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, picture } = req.body;

    // Assuming category is an object with name and description
    const updatedMedicalTest = await MedicalTest.findByIdAndUpdate(
      id,
      {
        name,
        category,
        price,
        description,
        picture,
      },
      { new: true }
    );

    if (!updatedMedicalTest) {
      return res.status(404).json({ message: "Medical test not found" });
    }

    res.status(200).json(updatedMedicalTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMedicalTest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMedicalTest = await MedicalTest.findByIdAndDelete(id);

    if (!deletedMedicalTest) {
      return res.status(404).json({ message: "Medical test not found" });
    }

    res.status(200).json({ message: "Medical test deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

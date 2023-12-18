import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: String,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;

// import mongoose from "mongoose";

// const TestSchema = new mongoose.Schema(
//   {
//     testName: String,
//     testType: String,
//     testDescription: String,
//     testCategory: String,
//     testRating: Number,
//     testSupply: Number,
//   },
//   { timestamps: true }
// );

// const Test = mongoose.model("Test", TestSchema);

// export default Test;

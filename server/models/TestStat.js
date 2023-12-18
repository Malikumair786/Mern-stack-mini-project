import mongoose from "mongoose";

const TestStatSchema = new mongoose.Schema(
  {
    testId: String, // This should match the _id of the corresponding test
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const TestStat = mongoose.model("TestStat", TestStatSchema);
export default TestStat;

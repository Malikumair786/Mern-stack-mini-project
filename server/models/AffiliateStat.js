import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Types.ObjectId, ref: "User"},   //One-to-One relationship
    affiliateSales:{                            //One to Many Relationship
        type: [mongoose.Types.ObjectId],
        ref: "Transaction"
    }
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;

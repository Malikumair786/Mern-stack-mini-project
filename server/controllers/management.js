// CORRECT BUT WITHOUT aDD, dELETE, UPDATE
// import mongoose from "mongoose"
// import User from '../models/User.js';
// import Transaction from "../models/Transaction.js";
// // import AffiliateStat from "../models/AffiliateStat.js";

// export const getPathologists = async(req, res)=>{
//     try{
//         const pathologists = await User.find({role: "pathologist"}).select("-password");
//         res.status(200).json(pathologists);
//     }
//     catch(error){
//         res.status(404).json({message: error.message})
//     }
//  }

// export const getUserPerformance = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       const userWithStats = await User.aggregate([
//         { $match: { _id: new mongoose.Types.ObjectId(id) } },
//         {
//           $lookup: {
//             from: "affiliatestats",
//             localField: "_id",
//             foreignField: "userId",
//             as: "affiliateStats",
//           },
//         },
//         { $unwind: "$affiliateStats" },
//       ]);
  
//       const saleTransactions = await Promise.all(
//         userWithStats[0].affiliateStats.affiliateSales.map((id) => {
//           return Transaction.findById(id);
//         })
//       );
//       const filteredSaleTransactions = saleTransactions.filter(
//         (transaction) => transaction !== null
//       );
  
//       res
//         .status(200)
//         .json({ user: userWithStats[0], sales: filteredSaleTransactions });
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   };




import mongoose from "mongoose";
import User from '../models/User.js';
import Transaction from "../models/Transaction.js";

export const getUserPerformance = async (req, res) => {
    try {
      const { id } = req.params;
  
      const userWithStats = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "affiliatestats",
            localField: "_id",
            foreignField: "userId",
            as: "affiliateStats",
          },
        },
        { $unwind: "$affiliateStats" },
      ]);
  
      const saleTransactions = await Promise.all(
        userWithStats[0].affiliateStats.affiliateSales.map((id) => {
          return Transaction.findById(id);
        })
      );
      const filteredSaleTransactions = saleTransactions.filter(
        (transaction) => transaction !== null
      );
  
      res
        .status(200)
        .json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


  export const getPathologists = async(req, res) => {
    try {
      const pathologists = await User.find({ role: "pathologist" }).select("-password");
      res.status(200).json(pathologists);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export const addPathologist = async (req, res) => {
  try {
    const { name, email, password, city, state, country, phoneNumber } = req.body;

    const newPathologist = new User({
      name,
      email,
      password,
      city,
      state,
      country,
      phoneNumber,
      role: "pathologist",
    });

    const savedPathologist = await newPathologist.save();

    res.status(201).json(savedPathologist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePathologist = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPathologist = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(updatedPathologist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePathologist = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPathologist = await User.findByIdAndRemove(id);

    res.status(200).json(deletedPathologist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};







export const getAdmins = async(req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addAdmin = async (req, res) => {
try {
  const { name, email, password, city, state, country, phoneNumber } = req.body;

  const newAdmin = new User({
    name,
    email,
    password,
    city,
    state,
    country,
    phoneNumber,
    role: "admin",
  });

  const savedAdmin = await newAdmin.save();

  res.status(201).json(savedAdmin);
} catch (error) {
  res.status(400).json({ message: error.message });
}
};

export const updateAdmin = async (req, res) => {
try {
  const { id } = req.params;
  const updatedAdmin = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(updatedAdmin);
} catch (error) {
  res.status(400).json({ message: error.message });
}
};

export const deleteAdmin = async (req, res) => {
try {
  const { id } = req.params;
  const deletedAdmin = await User.findByIdAndRemove(id);

  res.status(200).json(deletedAdmin);
} catch (error) {
  res.status(400).json({ message: error.message });
}
};

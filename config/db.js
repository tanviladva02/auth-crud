import mongoose from "mongoose";
export const DBConnect = async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb is connected successfully !");
  } catch (error) {
    return res.status(500).json({ message: "Error in mongoose connection !" });
  }
};

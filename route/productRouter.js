import express from "express";
import {
  createproduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} from "../services/productServices.js";
import { userAuth } from "../middleware/userAuth.js";
const router = express.Router();

router.post("/create", userAuth, createproduct);
router.get("/getAllProducts", getAllProduct);
router.delete("/delete/:id", userAuth, deleteProduct);
router.put("/update/:id", userAuth, updateProduct);
router.get("/getProductById/:id", getProductById);

export default router;

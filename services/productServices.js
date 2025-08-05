import product from "../model/product.js";
import mongoose from "mongoose";

export const createproduct = async (req, res) => {
  try {
    const payload = await req.body;
    if (!payload) {
      throw new Error("Bad Request!");
    }
    const { name, price, quantity, description } = payload;
    if (!name) {
      return res.status(400).json({ message: "name is required !" });
    }

    if (!price) {
      return res.status(400).json({ message: "price is required !" });
    }

    if (!quantity) {
      return res.status(400).json({ message: "quantity is required !" });
    }

    if (!description) {
      return res.status(400).json({ message: "description is required !" });
    }

    const productData = {
      name,
      price,
      quantity,
      description,
    };

    await product.create(productData);
    return res.status(200).json({ message: "product is created !" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error", error });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const allProduct = await product.find({});
    return res.status(200).json({
      message: "ProductList retrived successfully !",
      allProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const available = await product.findById(id);
    if (!available) {
      return res
        .status(400)
        .json({ message: "This product is not available!" });
    }
    await product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully !" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    let update = {};
    if (body.name) {
      update.name = body.name;
    }
    if (body.quantity) {
      update.quantity = body.quantity;
    }
    if (body.price) {
      update.price = body.price;
    }
    if (body.description) {
      update.description = body.description;
    }
    await product.findByIdAndUpdate(id, update);
    const productData = await product.find({ _id: id });
    return res
      .status(200)
      .json({ message: "Product updated successfully !", productData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await product.find({ _id: id });
    if (productData) {
      return res.status(200).json({ message: "Product : ", productData });
    } else {
      return res.status(404).json({ message: "Product not found !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error", error });
  }
};

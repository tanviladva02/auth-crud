import auth from "../model/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const payload = await req.body;
    if (!payload) {
      throw new Error("Bad Request!");
    }
    const { name, email, password } = payload;
    if (!name) {
      return res.status(400).json({ message: "name is required !" });
    }
    if (!email) {
      return res.status(400).json({ message: "email is required !" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required !" });
    }

    const userExists = await auth.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists !" });
    }

    const hashPass = await bcrypt.hash(password, 3);

    const userModel = {
      name,
      email,
      password: hashPass,
    };

    await auth.create(userModel);

    const user = await auth.findOne({ email });
    return res.status(200).json({
      message: "User has been created successfully !",
      user,
    });
  } catch (error) {
    console.log("Error in signup", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const body = await req.body;
    if (!body) {
      throw new Error("Bad Request!");
    }
    const { email, password } = body;
    if (!email) {
      return res.status(400).json({ message: "email is required !" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required !" });
    }

    const userExists = await auth.findOne({ email });
    if (!userExists) {
      return res
        .status(409)
        .json({ message: "User not exists please signup first !" });
    }

    const matchUser = bcrypt.compare(password, userExists.password);
    if (matchUser) {
      const token = jwt.sign({ id: userExists._id }, "secret", {
        expiresIn: "30d",
      });

      res.cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Login successfully !",
        id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        token,
      });
    }
  } catch (error) {
    console.error("Error in login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

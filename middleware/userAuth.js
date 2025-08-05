import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "unAuthorized!" });
    }

    console.log("---", token);
    try {
      const decode = jwt.verify(token, "secret");
      req.user = decode;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid token!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "unAuthorized" });
  }
};

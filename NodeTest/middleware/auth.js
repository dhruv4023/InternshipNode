import jwt from "jsonwebtoken";


export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send({ msg: "Access denied" });
    }

    // Check if the token starts with "Bearer " and remove it
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRECT);

    req.tokenData = verified;

    next();
  } catch (err) {
    // Handle token verification errors
    // console.log(err);
    res
      .status(500)
      .json({ msg: "error in token verification", error: err.message });
  }
};

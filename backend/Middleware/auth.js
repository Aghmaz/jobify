const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   jwt.verify(token, "secretKey", (err, decoded) => {
//     if (err) return res.status(401).json({ message: "Invalid token" });
//     req.userId = decoded.userId;
//     next();
//   });
// };

const authMiddleware = (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  // if (!token) return res.status(401).json({ message: "No token provided" });
  // jwt.verify(token, "secretKey", (err, decoded) => {
  //   if (err) return res.status(401).json({ message: "Invalid token" });
  //   req.userId = decoded.userId;
  //   next();
  // });
};

module.exports = { authMiddleware };

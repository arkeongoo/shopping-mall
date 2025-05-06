const jwt = require("jsonwebtoken");
const User = require("../models/Users");

let auth = async (req, res, next) => {
  //토큰을 request header에서 가져오기
  const authHeader = req.headers["authorization"];
  //토큰은 Bearer famklfa.mfksla.fmaskfas
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  try {
    //토큰이 유효한 토큰인지 확인
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode.userId });
    if (!user) return res.status(400).send("User not found");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };

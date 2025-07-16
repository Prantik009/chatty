import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  //create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  console.log("Cookies generated");

  //increse security for cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "None", // ✅ allow cross-origin cookie
    secure: true, // ✅ must be true when sameSite is "None"
  });

  //return token
  return token;
};

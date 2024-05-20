const { User } = require("../../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
  async handleLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Fields are empty." });
    }

    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      const accessToken = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      foundUser.refreshToken = refreshToken;
      await foundUser.save();

      res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.json({ data: accessToken });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  }
}

module.exports = new AuthController();

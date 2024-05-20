const { User } = require("../../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class RegisterController {
  async create(req, res) {
    const { email, password, first_name, last_name, role } = req.body;

    if (!email || !password || !first_name || !last_name || !role) {
      return res.status(400).json({ message: "Fields are empty." });
    }

    const duplicate = await User.findOne({ where: { email } });

    if (duplicate) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        email,
        password: hashedPwd,
        first_name,
        last_name,
        role,
      });

      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.status(201).json({ data: accessToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RegisterController();

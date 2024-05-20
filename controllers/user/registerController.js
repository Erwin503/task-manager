const { User } = require("../../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class RegisterController {
  async create(req, res) {
    const { email, password, first_name, last_name, role } = req.body;

    // Проверка на пустые поля
    if (!email || !password || !first_name || !last_name || !role)
      return res.status(400).json({
        message: "Fields are empty.",
      });

    // Проверка на повторение по email
    const duplicate = await User.findOne({
      where: {
        email: email,
      },
    });
    if (duplicate) return res.sendStatus(409).json({message: "Conflict"}); // Conflict

    // Шифрование пароля
    const hashedPwd = await bcrypt.hash(password, 10);

    // Если все прошло успешно то создание и запись в БД
    try {
      const user = await User.create({
        email,
        password: hashedPwd,
        first_name,
        last_name,
        role,
      });

      const accessToken = jwt.sign(
        {
          email: email,
          id: user.id,
        },
        "" + process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      const response = {
        data: accessToken,
      };

      res.status(200).json({
        response,
      });

      const { password, ...userData } = user.dataValues;
      console.log({ userData });
    } catch (error) {
      ``;
      res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new RegisterController();

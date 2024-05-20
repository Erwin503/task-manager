const { User } = require("../../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async handleLogin(req, res) {
    const { email, password } = req.body;

    // Проверка на пустые поля
    if (!email || !password)
      return res.status(400).json({
        message: "Fields are empty.",
      });
    // Поиск пользователя с таким email
    const foundUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!foundUser) return res.status(401).json({message: "empty user"}); // Not found or Unauthorized

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      // Создание JWT
      const accessToken = jwt.sign(
        {
          email: foundUser.email,
          id: foundUser.id,
        },
        "" + process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      // const refreshToken = jwt.sign(
      //   {
      //     email: foundUser.email,
      //     id: foundUser.id,
      //   },
      //   "" + process.env.REFRESH_TOKEN_SECRET,
      //   {
      //     expiresIn: "1d",
      //   }
      // );

      foundUser.refreshToken = refreshToken;
      foundUser.save();

      // console.log(foundUser.dataValues);
      console.log("ПОЛЬЗОВАТЕЛЬ НАЙДЕН");
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        data: accessToken,
      });
    } else {
      return res.sendStatus(401);
    }
  }
}

module.exports = new AuthController();

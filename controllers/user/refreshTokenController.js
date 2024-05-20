const { User } = require("../../models/models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class RefreshTokenController {
  async handleRefreshToken(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(401).json({ message: "No cookies :(" });
    }

    const refreshToken = cookies.jwt;

    // Поиск пользователя с таким токеном
    const foundUser = await User.findOne({
      where: {
        refreshToken: refreshToken,
      },
    });

    if (!foundUser) return res.sendStatus(403).json({ message: "Access denied" }); // Forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.email !== decoded.email)
          return res.sendStatus(403).json({ message: "Wrong email" });
        const accessToken = jwt.sign(
          {
            email: decoded.email,
            id: decoded.id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        res.status(200).json({
          data: accessToken,
        });
      }
    );
  }
}

module.exports = new RefreshTokenController();

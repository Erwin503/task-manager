const { User } = require("../../models/models");

class LogoutController {
  async handleLogout(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204);
    const refreshToken = cookies.jwt;

    // Поиск пользователя с таким токеном
    const foundUser = await User.findOne({
      where: {
        refreshToken: refreshToken,
      },
    });

    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(404).json({message: "User not found"});
    } // Forbidden

    // Delete refreshToken in db
    foundUser.refreshToken = "";
    foundUser.save();

    console.log(foundUser.dataValues);
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  }
}

module.exports = new LogoutController();

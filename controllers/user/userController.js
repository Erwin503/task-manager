const { User, Group } = require("../../models/models");
const { badRequest } = "../error/ApiError";

class UserController {
  async deleteUserById(req, res) {
    const id = req.body.id;
    try {
      const result = await User.destroy({
        where: {
          id: Number(id),
        },
      });
      if (result) {
        console.log(`Пользователь с ID ${id} успешно удален.`);
        res.status(200).json(result);
      } else {
        console.log(`Пользователь с ID ${id} не найден.`);
        res.status(200).json(result);
      }
    } catch (error) {
      console.error("Произошла ошибка при удалении пользователя:", error);
      res.status(500).json({
        message: "Произошла ошибка при удалении пользователя",
        error: error,
      });
    }
  }
  async update(req, res) {
    try {
      const userId = req.user.id;
      const userData = req.body;

      const foundUser = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!foundUser)
        return res.status(404).json({
          message: "Пользователь не найден",
        });

      for (var param in userData) {
        if (userData[param] == false) {
          foundUser[param] = "-";
        } else foundUser[param] = userData[param];
      }

      foundUser.save();

      return res.status(200).json(foundUser);
    } catch (err) {
      res.status(404).json({
        message: err,
      });
    }
  }

  async getProfile(req, res) {
    try {
      const userId = req.user.id;

      const foundUser = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!foundUser)
        return res.status(404).json({
          message: "Пользователь не найден",
        });

      const { password, refreshToken, createdAt, updatedAt, ...userData } =
        foundUser.dataValues;
      return res.json(userData);
    } catch (err) {
      res.status(404).json({
        message: err,
      });
    }
  }
}

module.exports = new UserController();

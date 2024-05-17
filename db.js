const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  "task_manager", // Название базы данных
  "root", // Пользователь базы данных
  "Wersia1797", // Пароль от БД
  {
    host: "localhost",
    dialect: "mysql",
  }
);

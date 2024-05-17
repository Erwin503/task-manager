const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING(250),
  },
  role: {
    type: DataTypes.ENUM("Teacher", "Student"),
    allowNull: false,
  },
});

const Topic = sequelize.define("Topic", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
});

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  text: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

const Test = sequelize.define("Test", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  text: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
});

const TestAnswer = sequelize.define("testAnswer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  isCorret: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

// Связь между таблицами User и Topic
User.hasMany(Topic, { as: "topics", foreignKey: "userId" });
Topic.belongsTo(User, { foreignKey: "userId" });

// Связь между таблицами Topic и Task
Topic.hasMany(Task, { as: "tasks", foreignKey: "topicId" });
Task.belongsTo(Topic, { foreignKey: "topicId" });

// Связь между таблицами Topic и Task
Topic.hasMany(Test, { as: "tests", foreignKey: "topicId" });
Test.belongsTo(Topic, { foreignKey: "topicId" });

// Связь между таблицами Topic и Task
Test.hasMany(TestAnswer, { as: "testAnswers", foreignKey: "testId" });
TestAnswer.belongsTo(Test, { foreignKey: "testId" });

module.exports = {
  User,
  Topic,
  Task,
  Test,
  TestAnswer,
};

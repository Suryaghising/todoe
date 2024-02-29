module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Todo;
};

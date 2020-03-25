module.exports = function (sequelize, DataTypes) {
  var defaultCharacterStats = sequelize.define("defaultCharacterStats", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    armor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weapon: {
      type: DataTypes.STRING,
      allownull: false,
    },
    HPTotal: {
      type: DataTypes.INTEGER,
      allownull: false,
    }
  });
  return defaultCharacterStats;
};
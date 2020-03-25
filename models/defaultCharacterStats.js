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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weapon: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    HPTotal: {
      type: DataTypes.INTEGER,
      allownull: false,
    }
  });
  return defaultCharacterStats;
};
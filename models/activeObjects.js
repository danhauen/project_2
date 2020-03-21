module.exports = function(sequelize, DataTypes) {
    var activeObjects = sequelize.define("Active Object", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        xPos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        yPos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        levelOnMap: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        currentHP: {
          type: DataTypes.INTEGER,
          allownull: false,
        },
        objectState: {
            type: DataTypes.INTEGER,
            allownull: false,
        }
      });
      return activeObjects;
    };
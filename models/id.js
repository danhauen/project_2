module.exports = function(sequelize, DataTypes) {
    var id = sequelize.define("Id list", {
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        itemNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

      });
      return id;
      
    };
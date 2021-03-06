module.exports = function(sequelize, DataTypes) {
    var items = sequelize.define("items", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        volume: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        value: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        arcaneValue: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        useWord: {
            type: DataTypes.STRING,
            allownull: false,
        }
    });
    return items;
};
  
    
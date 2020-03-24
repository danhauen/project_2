module.exports = function(sequelize, DataTypes) {
    var inventories = sequelize.define("inventories", {
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
    return inventories;
};
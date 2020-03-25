module.exports = function(sequelize, DataTypes) {
    var inputs = sequelize.define("inputs", {
        key: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
    return inputs;
};

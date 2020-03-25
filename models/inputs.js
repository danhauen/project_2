module.exports = function(sequelize, DataTypes) {
    var inputs = sequelize.define("inputs", {
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return inputs;
};

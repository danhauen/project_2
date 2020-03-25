module.exports = function(sequelize, DataTypes) {
    var barriers = sequelize.define("barriers", {
        rowHeight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        xn3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        xn2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        xn1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        x0: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        x1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        x2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        x3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        x4: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        yn3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        yn2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        yn1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        y0: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        y1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        y2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        y3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        y4: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return barriers;
};
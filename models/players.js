module.exports = function(sequelize, DataTypes) {
    var players = sequelize.define("players", {
        playerName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        playerScore:{
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
    });
    return players;
};
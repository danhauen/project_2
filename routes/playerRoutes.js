var db = require("../models");

module.exports = function(app) {
    //get recent players and high scores for display below game screen
    app.get("/api/players", function(req, res){
        db.players.findAll({}).then(function(dbplayers) {
            //displayRecentPlayers();
            //displayHighScores();
            res.json(dbplayers);
        });
    });

    //post player data to player table for display in layer sessions
    app.post("/api/players", function (req, res){
        db.players.create(req.query).then(function (dbplayers) {      
            res.json(dbplayers)
        });
    });
};

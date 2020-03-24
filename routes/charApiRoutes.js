var db = require("../models");

module.exports = function(app) {
  // Get all defaultCharacter
  app.get("/api/defaultCharacter", function(req, res) {
    db.defaultCharacter.findAll({}).then(function(dbdefaultCharacter) {
      res.json(dbdefaultCharacter);
    });
  });

  app.get("/api/defaultCharacter/:id",function(req, res){
    db.defaultCharacter.findOne({ where: { id: req.params.id } }).then(function(dbdefaultCharacter) {
      res.json(dbdefaultCharacter);
    });
  });

  // Create a new defaultCharacter
  app.post("/api/defaultCharacter", function(req, res) {
    db.defaultCharacter.create(req.body).then(function(dbdefaultCharacter) {
      res.json(dbdefaultCharacter);
    });
  });

  // Delete an defaultCharacter by id
  app.delete("/api/defaultCharacter/:id", function(req, res) {
    db.defaultCharacter.destroy({ where: { id: req.params.id } }).then(function(dbdefaultCharacter) {
      res.json(dbdefaultCharacter);
    });
  });

  //post player name to database

  //get recent players

  //get high scores 


};

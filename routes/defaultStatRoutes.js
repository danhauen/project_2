var db = require("../models");

module.exports = function(app) {
  // Get all defaultCharacter
  app.get("/api/defaultStats", function(req, res) {
    db.defaultStats.findAll({}).then(function(dbdefaultCharacter) {
      res.json(dbdefaultCharacter);
    });
  });
};

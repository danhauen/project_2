var db = require("../models");

module.exports = function(app) {
  // Get all activeObjects
  app.get("/api/activeObjects", function(req, res) {
    db.activeObjects.findAll({}).then(function(dbactiveObjects) {
      res.json(dbactiveObjects);
    });
  });

  app.get("/api/activeObjects/:id",function(req, res){
    db.activeObjects.findOne({ where: { id: req.params.id } }).then(function(dbactiveObjects) {
      res.json(dbactiveObjects);
    });
  });

  // Create a new activeObjects
  app.post("/api/activeObjects", function(req, res) {
    db.activeObjects.create(req.body).then(function(dbactiveObjects) {
      res.json(dbactiveObjects);
    });
  });

  // Delete an activeObjects by id
  app.delete("/api/activeObjects/:id", function(req, res) {
    db.activeObjects.destroy({ where: { id: req.params.id } }).then(function(dbactiveObjects) {
      res.json(dbactiveObjects);
    });
  });
};
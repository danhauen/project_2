var db = require("../models");

module.exports = function(app) {
  // Get all items
  app.get("/api/items", function(req, res) {
    db.items.findAll({}).then(function(dbitems) {
      res.json(dbitems);
    });
  });

  app.get("/api/items/:id",function(req, res){
    db.items.findOne({ where: { id: req.params.id } }).then(function(dbitems) {
      res.json(dbitems);
    });
  });

  // Create new items
  app.post("/api/items", function(req, res) {
    db.items.create(req.body).then(function(dbitems) {
      res.json(dbitems);
    });
  });

  // Delete items by id
  app.delete("/api/items/:id", function(req, res) {
    db.items.destroy({ where: { id: req.params.id } }).then(function(dbitems) {
      res.json(dbitems);
    });
  });
};

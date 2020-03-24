var db = require("../models");
var render = require("./render");

module.exports = function(app) {
  console.log("\nSOME'N\n");
  app.get("/api/barriers", function(req, res) {
    render();
    db.barriers.findAll({}).then(function(dbbarriers) {
      res.json(dbbarriers);
    });
  });
};
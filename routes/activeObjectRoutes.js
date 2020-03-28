var db = require("../models");
const Op = require("sequelize").Op;

module.exports = function(app) {
  // Get all activeObjects
  app.get("/api/activeObjects", function(req, res) {
    db.activeObjects.findAll({}).then(function(response) {
      res.json(response);
    });
  });

  app.get("/api/activeObjects/coords", function(req, res) {
    db.activeObjects.findAll({where:{
      name: {[Op.ne]: "PC"}
    }}).then(function(response) {
      db.activeObjects.findOne({where:{name: "PC"}}).then(function(PC){
        var x = PC.xPos;
        var y = PC.yPos;
        var i = 0;
        while(i < response.length){
          if(Math.abs(response[i].xPos - x) > 3 || Math.abs(response[i].yPos - y) > 3){
            response.splice(i,1);
          }
          else{
            response[i].xPos -= x;
            response[i].yPos -= y;
            i++;
          };
        };
        res.json(response);
      });
    });
  });
};
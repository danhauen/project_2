var db = require("../models");
var grid = require("../world/grid");

module.exports = function (app) {
  app.get("/api/barriers", function (req, res) {
    var x = 0;
    var y = 0;
    db.activeObjects.findOne({ where: { name: "PC" } }).then(function (PC) {
      x = PC.xPos;
      y = PC.yPos;
      var thensReached = 0;
      for (var i = -3; i < 4; i++) {
        var inputs = grid.zeroArray(16);
        for (var j = -3; j <= 4; j++) {
          inputs[j + 3] = grid.findBarrier(x + j, y + i, true);
          inputs[j + 11] = grid.findBarrier(x + i, y + j, false);
        };
        for (j in inputs) {
          if (inputs[j] === null) {
            inputs[j] = 0;
          };
        };

        db.barriers.update({
          xn3: inputs[0],
          xn2: inputs[1],
          xn1: inputs[2],
          x0: inputs[3],
          x1: inputs[4],
          x2: inputs[5],
          x3: inputs[6],
          x4: inputs[7],
          yn3: inputs[8],
          yn2: inputs[9],
          yn1: inputs[10],
          y0: inputs[11],
          y1: inputs[12],
          y2: inputs[13],
          y3: inputs[14],
          y4: inputs[15],
        }, { where: { rowHeight: i } }).then(function () {
          thensReached++;
          if (thensReached === 7) {
            console.log("here");
            db.barriers.findAll({}).then(function (dbbarriers) {
              res.json(dbbarriers);
            });
          };
        });
      };
    });
  });
};
var grid = require("./grid");
var mapper = require("./mapper");

var db = require("../models");

module.exports = function(){
    grid.addArea([0,10,0,10]);
    mapper.hallsWidthTwo([[2,2,2,8],[2,4,6,4],[6,5,6,5],[10,5,5,10]]);
    for(var i = -3; i < 4; i++){
        db.barriers.destroy({
            where: {},
            truncate: true
        });
        db.barriers.create({
            rowHeight: i, xn3: 0, xn2: 0, xn1: 0, x0: 0, x1: 0, x2: 0, x3: 0, x4: 0,
                          yn3: 0, yn2: 0, yn1: 0, y0: 0, y1: 0, y2: 0, y3: 0, y4: 0,
        }).then(function(){ console.log("Then statement reached"); });
    };
    db.activeObjects.destroy({ where: {name: "PC"}, });
    db.activeObjects.create({
        name: "PC",
        xPos: 0,
        yPos: 0,
        levelOnMap: 0,
        charType: 1,
        currentHP: 1,
        objectState: 1,
    }).then(function(){ console.log("Then statement reached"); });
    db.inputs.destroy({
        where: {},
        truncate: true
    });
    db.inputs.create({key: ""}).then(function(){ console.log("Then statement reached."); });
};

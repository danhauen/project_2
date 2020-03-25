var grid = require("./grid");
var mapper = require("./mapper");

var db = require("../models");

module.exports = function(){
    grid.addArea([0,10,0,10]);
    mapper.hallsWidthTwo([[2,2,2,8],[2,4,6,4],[6,5,6,5],[10,5,5,10]]);
    mapper.replaceBarrier(3,2,true,0);
    mapper.replaceBarrier(5,5,true,0);
    mapper.replaceBarrier(9,4,false,0);
    mapper.replaceBarrier(4,9,false,0);

    for(var i = -3; i < 4; i++){
        db.barriers.destroy({
            where: {},
            truncate: true
        });
        db.barriers.create({
            rowHeight: i, xn3: 0, xn2: 0, xn1: 0, x0: 0, x1: 0, x2: 0, x3: 0, x4: 0,
                          yn3: 0, yn2: 0, yn1: 0, y0: 0, y1: 0, y2: 0, y3: 0, y4: 0,
        });
    };

    db.defaultCharacterStats.destroy({
        where: {},
        truncate: true
    });
    db.activeObjects.destroy({ where: {levelOnMap: 0}, });
    function createActObj(name, xPos, yPos, charType, objectState = 1){
        db.defaultCharacterStats.findOne({ where: { name : charType } }).then(function(dStats){
            db.activeObjects.create({
                name: name,
                xPos: xPos,
                yPos: yPos,
                levelOnMap: 0,
                charType: dStats.id,
                currentHP: dStats.HPTotal,
                objectState: objectState,
            });
        });
    };

    db.defaultCharacterStats.create({
        name: "Peasant",
        description: "Mostly Harmless",
        armor: 0,
        weapon: 0,
        HPTotal: 30
    }).then(function(){
        createActObj("PC",0,0,"Peasant");
    });

    db.defaultCharacterStats.create({
        name: "Slime",
        description: "A small, immobile chunk of sludge. It doesn't look dangerous, but you're going to pretend it is, "
                   + "to make yourself feel better about what you're going to try to do to it.",
        armor: 0,
        weapon: 0,
        HPTotal: 5
    }).then(function(){
        createActObj("Slime",5,0,"Slime",2);
        createActObj("Slime",7,3,"Slime",2);
        createActObj("Slime",3,10,"Slime",2);
    });

    db.inputs.destroy({
        where: {},
        truncate: true
    });
    db.inputs.create({key: ""});
};

var db = require("../models");
var level0 = require("./level0");

module.exports = function(){
    console.log("\n\n\n\n");
    for(var i = -3; i < 4; i++){
        db.barriers.destroy({
            where: {},
            truncate: true
        }).then(function(){
            console.log("\nhere\n");
        });
        db.barriers.create({
            rowHeight: i, xn3: 0, xn2: 0, xn1: 0, x0: 0, x1: 0, x2: 0, x3: 0, x4: 0,
                          yn3: 0, yn2: 0, yn1: 0, y0: 0, y1: 0, y2: 0, y3: 0, y4: 0,
        });
    };

    db.inputs.destroy({
        where: {},
        truncate: true
    });
    db.inputs.create({key: ""});

    db.activeObjects.destroy({
        where: {},
        truncate: true
    });
    db.defaultCharacterStats.destroy({
        where: {},
        truncate: true
    });
    db.defaultCharacterStats.create({
        name: "Peasant",
        description: "Mostly Harmless",
        armor: 0,
        weapon: 0,
        HPTotal: 30
    }).then(function(){
        db.defaultCharacterStats.create({
            name: "Slime",
            description: "A small, immobile chunk of sludge. It doesn't look dangerous, but you're going to pretend it is, "
                       + "to make yourself feel better about what you're going to try to do to it.",
            armor: 0,
            weapon: 0,
            HPTotal: 5
        }).then(function(){
            level0(); //Most levels shouldn't need to be nested like this: we'll record the other defaultStats before they leave lv 0
        });
    });
};
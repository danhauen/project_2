var db = require("../models");

module.exports = function(name, xPos, yPos, level, charType, objectState = 1){
    db.defaultStats.findOne({ where: { name : charType } }).then(function(dStats){
        db.activeObjects.create({
            name: name,
            xPos: xPos,
            yPos: yPos,
            levelOnMap: level,
            charType: dStats.id,
            currentHP: dStats.HPTotal,
            objectState: objectState,
        });
    });
};
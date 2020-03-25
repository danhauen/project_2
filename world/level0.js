var grid = require("./grid");
var mapper = require("./mapper");
var createActObj = require("./createActObj");

module.exports = function(){
    grid.addArea([0,10,0,10]);
    mapper.hallsWidthTwo([[2,2,2,8],[2,4,6,4],[6,5,6,5],[10,5,5,10]]);
    mapper.replaceBarrier(3,2,true,0);
    mapper.replaceBarrier(5,5,true,0);
    mapper.replaceBarrier(9,4,false,0);
    mapper.replaceBarrier(4,9,false,0);

    createActObj("PC",0,0,0,"Peasant");

    createActObj("Slime",5,0,0,"Slime",2);
    createActObj("Slime",7,3,0,"Slime",2);
    createActObj("Slime",3,10,0,"Slime",2);
};

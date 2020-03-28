var db = require("../models");

var grid = require("../world/grid");
var facing = 0;
var message = "";

module.exports = function(app) {
    function updateMap(){
        db.inputs.update({ key: "", message: message },{ where: { id: 1 } });
    };

    function move(){
        var barrier = grid.findBarrier(x+(facing===1),y+(facing===3),facing<2);
        if(barrier === 0){
            var xPos = x - (facing === 0) + (facing === 1);
            var yPos = y - (facing === 2) + (facing === 3);
            db.activeObjects.findAll({where: {levelOnMap: 0, xPos: xPos, yPos: yPos}}).then(function(response){
                if(response.length){
                    //Ran into something, and are now facing it
                }
                else{
                    db.activeObjects.update({xPos: xPos, yPos: yPos},{ where: { name: "PC" } }).then(updateMap());
                };
            });
        }
        else{
            //Ran into a wall
            updateMap();
        };
    };

    app.get("/api/inputs", function(req, res) {
        db.inputs.findOne({ where: { id: 1 } }).then(function(response) {
            res.json(response);
        });
    });

    app.post("/api/inputs", function(req, res) {
        req = (Object.keys(req.body)[0]);
        db.inputs.update({ key: req },{
            where: { id: 1 },
            returning: true,
            plain: true,
        }).then(function(response) {
            res.json(response);
            //if req is this input, do this, yadda yadda,
            //.then db.input.update   key:""
            db.activeObjects.findOne({ where: { name: "PC" } }).then(function (PC) {
                x = PC.xPos;
                y = PC.yPos;
                if(req === "a" || req === "ArrowLeft"){
                    facing = 0;
                    move();
                }
                else if(req === "d" || req === "ArrowRight"){
                    facing = 1;
                    move();
                }
                else if(req === "s" || req === "ArrowDown"){
                    facing = 2;
                    move();
                }
                else if(req === "w" || req === "ArrowUp"){
                    facing = 3;
                    move();
                }
                else{
                    updateMap();
                };
            });
        });
    });
};
var db = require("../models");

var grid = require("./../world/grid");
var facing = 0;

module.exports = function(app) {
    function updateMap(){
        db.inputs.update({ key: "" },{ where: { id: 1 } });
    };

    function move(){
        var barrier = grid.findBarrier(x+(facing===1),y+(facing===3),facing<2);
        if(barrier === 0){
            db.activeObjects.update({
                xPos: x - (facing === 0) + (facing === 1),
                yPos: y - (facing === 2) + (facing === 3),
            },{ where: { name: "PC" } }).then(updateMap());
        }
        else{
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
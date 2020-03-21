var grid = require("./grid");
module.exports = {
    replaceBarrier: function(x,y,vert,newVal){
        if(vert){
            var indeces = [];
            var barrier = [];
            for(i in grid.barrierX){
                barrier = grid.barrierX[i]
                indeces.push(barrier[0]);
            };
            y = indeces.indexOf(y);
            barrier = grid.barrierX[y];
            x -= barrier[1];
            x += 2;
            barrier[x] = newVal;
            grid.barrierX[y] = barrier;
        }
        else{
            var indeces = [];
            var barrier = [];
            for(i in grid.barrierY){
                barrier = grid.barrierY[i]
                indeces.push(barrier[0]);
            };
            x = indeces.indexOf(x);
            barrier = grid.barrierY[x];
            y -= barrier[1];
            y += 2;
            barrier[y] = newVal;
            grid.barrierY[x] = barrier;
        };
    },

    straightWall: function(vert,loc,range){
        if(!Array.isArray(range)){
            throw "A wall has two end values; put them in an array.";
        }
        else if(range.length !== 2){
            throw "A wall has two end values.";
        };
        for(i in range.concat([loc])){
            var num = range.concat([loc])[i];
            if(typeof num !== "number"){
                throw "Grid coordinates should be numbers.";
            }
            else if(num !== Math.floor(num)){
                throw "Grid coordinates should be integers.";
            };
        };
        var r1 = range[0];
        var r2 = range[1];
        if(r1 >= r2){
            throw "Specify wall lengths from lowest to highest coordinate.";
        };
        var barrier = [];
        while(r2 > r1){
            r2--;
            barrier.push([r2,loc,1]);
        };
        if(vert){
            grid.addBarrier(barrier,[]);
        }
        else{
            grid.addBarrier([],barrier);
        };
    },

    vertWall: function(x,[y1,y2]){
        straightWall(true,x,[y1,y2]);
    },

    horiWall: function([x1,x2],y){
        straightWall(false,y,[x1,x2]);
    },

    diagonalWall: function([x1,y1],[x2,y2],jutUp){
        var Arr = [x1,y1,x2,y2];
        for(i in Arr){
            if(typeof Arr[i] !== "number"){
                throw "Grid coordinates should be numbers.";
            }
            else if(Arr[i] !== Math.floor(Arr[i])){
                throw "Grid coordinates should be integers.";
            };
        };
        if(x1-x2 !== y1-y2 && x1-x2 !== y2-y1){
            throw "This function is for diagonal walls with endpoints at 45 degrees to an axis.";
        };
        if(typeof jutUp !== "boolean"){
            throw "Does this jagged wall jut upwards or down?";
        };

        var newBarrierX = [];
        var newBarrierY = [];
        if(x1-x2 === y1-y2){
            if(x1 > x2){
                [x1,x2] = [x2,x1];
                y2 = y1;
            };
            while(x1 < x2){
                if(jutUp){
                    x2--;
                    newBarrierY.push([x2,y2,1]);
                };
                y2--;
                newBarrierX.push([y2,x2,1]);
                if(!jutUp){
                    x2--;
                    newBarrierY.push([x2,y2,1]);
                };
            };
        }
        else{
            if(x1 > x2){
                [x1,x2] = [x2,x1];
                y2 = y1;
            };
            while(x1 < x2){
                if(!jutUp){
                    x2--;
                    newBarrierY.push([x2,y2,1]);
                };
                y2++;
                newBarrierX.push([y2,x2,1]);
                if(jutUp){
                    x2--;
                    newBarrierY.push([x2,y2,1]);
                };
            };
        };
        grid.addBarrier(newBarrierX,newBarrierY);
    },

    addRoom: function(box){
        if(!Array.isArray(box)){
            throw "A box is an array of numbers.";
        }
        else if(box.length !== 4){
            throw "A box is an array of four numbers.";
        };
        x1 = box[0];
        x2 = box[1];
        y1 = box[2];
        y2 = box[3];
        this.horiWall([x1,x2],y1);
        this.horiWall([x1,x2],y2);
        this.vertWall(x1,[y1,y2]);
        this.vertWall(x2,[y1,y2]);
    },

    hallsWidthTwo(hallEndList){
        if(!Array.isArray(hallEndList)){
            throw "Make an array containing at least the halls you want connected.";
        };
        for(i in hallEndList){
            var hall = hallEndList[i];
            if(!Array.isArray(hall)){
                throw "A hall is specified by an array: [x1, y1, x2, y2].";
            }
            else if(hall.length !== 4){
                throw "A hall is specified by an array: [x1, y1, x2, y2].";
            };
            for(j in hall){
                if(typeof hall[j] !== "number"){
                    throw "Grid coordinates should be numbers.";
                }
                else if(hall[j] !== Math.floor(hall[j])){
                    throw "Grid coordinates should be integers.";
                };
            };
            var [x1,y1,x2,y2] = hall;
            if(x1 !== x2 && y1 !== y2 && x1-x2 !== y1-y2 && x1-x2 !== y2-y1){
                throw "A hallway must be straight up and down, left and right, or diagonal.";
            };
        };

        var oldMap = [grid.areaBounds,grid.barrierX,grid.barrierY];
        grid.areaBounds = [];
        grid.barrierX = [];
        grid.barrierY = [];

        for(i in hallEndList){
            var [x1,y1,x2,y2] = hallEndList[i];
            if(x1 === x2 || y1 === y2){
                grid.addArea([x1 - 1, x2 + 1, y1 - 1, y2 + 1]);
            }
            else if(x1-x2 === y1-y2){
                if(x1 > x2){
                    [x1,x2] = [x2,x1];
                    y2 = y1;
                };
                x2++;
                y2++;
                while(x1 < x2){
                    x2--;
                    y2--;
                    grid.addArea([x2 - 1, x2 + 1, y2 - 1, y2 + 1]);
                };
            }
            else{
                if(x1 > x2){
                    [x1,x2] = [x2,x1];
                    y2 = y1;
                };
                x2++;
                y2--;
                while(x1 < x2){
                    x2--;
                    y2++;
                    grid.addArea([x2 - 1, x2 + 1, y2 - 1, y2 + 1]);
                };
            };
        };

        for(i in grid.barrierX){
            for(j in grid.barrierX[i]){
                if(grid.barrierX[i][j] && j > 1){
                    grid.barrierX[i][j] = 1;
                };
            };
        };
        for(i in grid.barrierY){
            for(j in grid.barrierY[i]){
                if(grid.barrierY[i][j] && j > 1){
                    grid.barrierY[i][j] = 1;
                };
            };
        };

        var newBarrierX = grid.barrierX;
        var newBarrierY = grid.barrierY;
        [grid.areaBounds,grid.barrierX,grid.barrierY] = oldMap;
        grid.addBarrier(newBarrierX,newBarrierY);
    },
};

// grid.addArea([0,10,0,10]);
// console.log(grid.barrierX);
// console.log(grid.barrierY);

// module.exports.hallsWidthTwo([[2,2,2,8],[2,4,6,4],[6,5,6,5],[10,5,5,10]]);
// console.log(grid.barrierX);
// console.log(grid.barrierY);

// module.exports.replaceBarrier(9,4,false,7);
// console.log(grid.barrierX);
// console.log(grid.barrierY);

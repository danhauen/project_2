module.exports = {
    areaBounds: [],
    barrierX: [],
    barrierY: [],

    defaultArea: function(){
        this.areaBounds = [[0,1,0,1]]; //Each area's size can be decided by boxes. If the area is a box, it's bounded by one box.
        //If it's a triangle, we need a box for every new row/column/jagged diagonal thing.
        //x1,x2,y1,y2 -- This default is a one by one square
        this.barrierX = [[0,0,-1,-1]];
        this.barrierY = [[0,0,-1,-1]]; //These two are where all the work seems to be.
    },

    zeroArray: function(length){ //This just makes an array full of zereos, of some length
        if(typeof length !== "number"){
            throw "The length of an array should be a number.";
        }
        else if(length < 0){
            throw "An array cannot have negative length.";
        }
        else if(length !== Math.floor(length)){
            throw "An array cannot have non-integer length.";
        };

        var ans = [];
        while(length){
            length--;
            ans.push(0);
        }
        return ans;
    },

    addWalls: function(barrier,newBarrier){
        var ans = [];
        function helper(element){
            ans.push(element);
            barrier.shift();
            newBarrier.shift();
        };
        helper(barrier[0]);

        var extension = barrier[0] - newBarrier[0];
        if(extension > 0){
            helper(newBarrier[0]);
            barrier = this.zeroArray(extension).concat(barrier);
        }
        else{
            helper(barrier[0]);
            if(extension < 0){
                newBarrier = this.zeroArray(-extension).concat(newBarrier);
            };
        };
        extension = barrier.length - newBarrier.length;
        if(extension > 0){
            newBarrier = newBarrier.concat(this.zeroArray(extension));
        }
        else if(extension < 0){
            barrier = barrier.concat(this.zeroArray(-extension));
        };

        var barrierExists = false;
        var newExists = false;
        while(barrier.length){
            if(barrier[0] < 0){
                barrierExists = !barrierExists;
            };
            if(newBarrier[0] < 0){
                newExists = !newExists;
            };

            if(barrier[0] > 0){
                if(newBarrier[0] > 0){
                    helper(newBarrier[0]);
                }
                else{
                    helper(barrier[0]);
                };
            }
            else if(!newBarrier[0]){
                if(!newExists && barrier[0]){
                    helper(-1);
                }
                else{
                    helper(0);
                };
            }
            else if(newBarrier[0] > 0){
                if(newExists){
                    helper(newBarrier[0]);
                }
                else if(barrier[0] < 0){
                    helper(-1);
                }
                else if(barrierExists){
                    helper(newBarrier[0]);
                }
                else{
                    helper(0);
                };
            }
            else{
                if(newExists && barrier[0] < 0){
                    if(barrierExists){
                        helper(-1);
                    }
                    else{
                        helper(0);
                    };
                }
                else if(barrierExists){
                    helper(0);
                }
                else{
                    helper(-1);
                };
            };
        };
        newBarrier = [ans[0], ans[1]];
        ans.shift();
        ans.shift();
        console.log("ans = " + ans);
        while(ans.length && ans[0] === 0){
            newBarrier[1]++;
            ans.shift();
        };
        while(ans.length && ans[ans.length-1] === 0){
            ans.pop();
        };
        console.log("Now, ans = " + ans + "\n");
        if(barrierExists || newExists){
            throw "There should be an even number of 'worldedge' barriers in each array of a barrierArray."
        };
        return newBarrier.concat(ans);
    },

    addBarrier: function(newBarrierX,newBarrierY){
        if(!Array.isArray(newBarrierX)){
            throw "A barrierArray needs to be an array.";
        };
        if(!Array.isArray(newBarrierY)){
            throw "A barrierArray needs to be an array.";
        };    

        function helper(barriers,newBarrier){
            if(!Array.isArray(newBarrier)){
                throw "All elements of a barrierArray need to be arrays.";
            };
            for(i in newBarrier){
                if(typeof newBarrier[i] !== "number"){
                    throw "Every element of a barrierArray's element must be a number.";
                }
                else if(newBarrier[i] < -1 && 1 < i){
                    throw "-1 is the lowest barrier value.";
                }
                else if(newBarrier[i] < 1 && newBarrier[i] !== Math.floor(newBarrier[i])){
                    throw "Invalid barrier value.";
                };
            };

            var indeces = [];
            var order = newBarrier[0];
            for(i in barriers){
                indeces.push(barriers[i][0]);
            };
            var index = indeces.indexOf(order);

            if(index < 0){
                index++;
                for(i in indeces){
                    if(indeces[i] < order){
                        index++;
                    }
                    else{
                        break;
                    };
                };
                var barrier = [order,0,0]
                barriers.splice(index,0,barrier);
            }
            else{
                var barrier = barriers[index];
            };
            barrier = module.exports.addWalls(barrier,newBarrier);
            if(barrier.length > 2){
                barriers.splice(index,1,barrier);
            }
            else{
                barriers.splice(index,1);
            }
            return barriers;
        };

        for(i in newBarrierX){
            this.barrierX = helper(this.barrierX, newBarrierX[i]);
        };
        for(i in newBarrierY){
            this.barrierY = helper(this.barrierY, newBarrierY[i]);
        };
    },

    addArea: function(box){
        if(!Array.isArray(box)){
            throw "A box should be defined by an array of four numbers.";
        }
        else if(box.length !== 4){
            throw "A box should be defined by an array of four numbers.";
        };
        for(var i = 0; i < 4; i++){
            if(typeof box[i] !== "number"){
                throw "There should be a number in position " + i + ".";
            }
            else if(box[i] !== Math.floor(box[i])){
                throw "A grid cannot have non-integer coordinates, check position " + i + ".";
            };
            i++;
        };
        var x1 = box[0];
        var x2 = box[1];
        var y1 = box[2];
        var y2 = box[3];
        if(x1 >= x2){
            throw "x1 should be less than x2.";
        };
        if(y1 >= y2){
            throw "y1 should be less than y2.";
        };
        this.areaBounds.push([x1,x2,y1,y2]);

        var newBarrierX = [];
        var y = y1;
        while(y < y2){
            var newBarrier = [y,x1,-1];
            newBarrier = newBarrier.concat(this.zeroArray((x2-x1-1)));
            newBarrier.push(-1);
            newBarrierX.push(newBarrier);
            y++;
        };

        var newBarrierY = [];
        var x = x1;
        while(x < x2){
            var newBarrier = [x,y1,-1];
            newBarrier = newBarrier.concat(this.zeroArray((y2-y1-1)));
            newBarrier.push(-1);
            newBarrierY.push(newBarrier);
            x++;
        };

        this.addBarrier(newBarrierX,newBarrierY);
    },
};

//module.exports.defaultArea();
//module.exports.addArea([2,4,-1,2]);
//console.log(module.exports.barrierX);
//console.log(module.exports.barrierY);
//module.exports.addArea([0,2,0,1]);
//console.log(module.exports.barrierX);
//console.log(module.exports.barrierY);

//module.exports.defaultArea();
//module.exports.addArea([-3,3,-1,1]);
//module.exports.addArea([-2,2,-2,2]);
//module.exports.addArea([-1,1,-3,3]);
//console.log(module.exports.barrierX);
//console.log(module.exports.barrierY);

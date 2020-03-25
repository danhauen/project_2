$(document).ready(function(){
    var canvas = $("#gameCanvas");
    var ctx = canvas[0].getContext('2d')

// The API object contains methods for each kind of request we'll make
    var API = {
        refreshBarrier: function() {
            return $.ajax({
                url: "api/barriers",
                type: "GET"
            });
        },
    };

    function greySelect(x,y){
        switch(Math.max(Math.abs(x),Math.abs(y))){
            case 0:
                return "#777777";
            case 1:
                return "#666666";
            case 2:
                return "#555555";
            case 3:
                return "#444444";
            default:
                break;
        };
    };

    function floorSelect(dist){
        switch(dist){
            case 1:
                return "#888888";
            case 2:
                return "#777777";
            case 3:
                return "#666666";
            default:
                break;
        };
    };

    function makeRectangle(x1,x2,y1,y2,color) {
        ctx.beginPath();
        ctx.rect(x1, 498 - y2, x2 - x1, y2 - y1);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };

    function horiWall(x,y,left,right){
        ctx.beginPath();
        if(y > 0){
            left = !left;
            right = !right;
        };
        ctx.moveTo(70*(x+3)+left*8,498-70*(y+3));
        ctx.lineTo(70*(x+3)+8-left*8,498-70*(y+3)-8);
        ctx.lineTo(70*(x+4)+right*8,498-70*(y+3)-8);
        ctx.lineTo(70*(x+4)+8-right*8,498-70*(y+3));
        if(y > 0){
            y--;
        };
        ctx.fillStyle = greySelect(x,y);
        ctx.fill();
        ctx.closePath();
    };

    function vertWall(x,y,above,below,edge = false){
        ctx.beginPath();
        if(x > 0){
            above = !above;
            below = !below;
        };
        ctx.moveTo(70*(x+3),498-70*(y+3)-below*8);
        ctx.lineTo(70*(x+3),498-70*(y+4)-8+above*8);
        ctx.lineTo(70*(x+3)+8,498-70*(y+4)-above*8);
        ctx.lineTo(70*(x+3)+8,498-70*(y+3)-8+below*8);
        if(x > 0){
            x--;
        }
        if(edge){
            ctx.fillStyle = "#555555";
        }
        else{
            ctx.fillStyle = greySelect(x,y);
        };
        ctx.fill();
        ctx.closePath();
    };

    function lightRight(x,y,above,below){
        makeRectangle(70*(x+3),70*(x+4),70*(y+3)+8-8*below,70*(y+4)+8*above,floorSelect(x));

        function helper(up){
            ctx.beginPath();
            ctx.moveTo(70*(x+3),498-70*(y+3+up)-8+8*up);
            ctx.lineTo(70*(x+4),498-70*(y+3+up)-8+8*up);
            ctx.lineTo(70*(x+4),498-70*(y+2+3*up)-8+8*up);
            ctx.fillStyle = floorSelect(x);
            ctx.fill();
            ctx.closePath();

            if(barrierX[y+2+2*up][x+4] !== 0){
                above = false;
                below = barrierX[y+3][x+4];
                if(x < 3){
                    below = below || barrierY[x+4][y+4];
                };
                if(!up){
                    [above,below] = [below,above];
                };
                vertWall(x+1,y-1+2*up,above,below);
            }
            else if(x < 3){
                lightRight(x+1,y-1+2*up,!up,up);
            }
            else{
                vertWall(x+1,y-1+2*up,y<1-2*up,y>1-2*up,true);
            };
        };

        if(!below){
            if(barrierY[x+3][y+3] !== 0){
                var left = barrierY[x+2][y+3] !== 0 || barrierX[y+2][x+3] !== 0;
                horiWall(x,y,left,false);
            }
            else{
                helper(false);
            };
        };
        if(!above){
            if(barrierY[x+3][y+4] !== 0){
                var left = barrierY[x+2][y+4] !== 0 || barrierX[y+4][x+3] !== 0;
                horiWall(x,y+1,left,false);
            }
            else{
                helper(true);
            };
        };

        if(barrierX[y+3][x+4] !== 0){
            above = false;
            below = false;
            if(y > 0){
                below = barrierX[y+2][x+4] !== 0;
                if(x < 3){
                    below = below || barrierY[x+4][y+3];
                };
            }
            else if(y < 0){
                above = barrierX[y+4][x+4] !== 0;
                if(x < 3){
                    above = above || barrierY[x+4][y+4];
                };
            };
            vertWall(x+1,y,above,below);
        }
        else if(x < 3){
            lightRight(x+1,y,y<0,y>0);
        }
        else{
            vertWall(x+1,y,y<0,y>0,true);
        };
    };

    function draw(){
        makeRectangle(0,498,0,498,"#000000");
        makeRectangle(218,280,218,280,"#F8C377");
        if(barrierX[3][3] !== 0){
            vertWall(0,0,false,false);
            switch(barrierX[3][3]){
                default:
                    break;
            };
        }
        else{
            lightLeft(-1,0,false,false);
        };
        if(barrierX[3][4] !== 0){
            vertWall(1,0,false,false);
            switch(barrierX[3][4]){
                default:
                    break;
            };
        }
        else{
            lightRight(1,0,false,false);
        };
        if(barrierY[3][3] !== 0){
            horiWall(0,0,false,false);
            switch(barrierY[3][3]){
                default:
                    break;
            };
        }
        else{
            lightDown(0,-1,false,false);
        };
        if(barrierY[3][4] !== 0){
            horiWall(0,1,false,false);
            switch(barrierY[3][4]){
                default:
                    break;
            };
        }
        else{
            lightUp(1,0,false,false);
        };
    };

    var barrierX = [[],[],[],[],[],[],[]];
    var barrierY = [[],[],[],[],[],[],[]];
    API.refreshBarrier().then(function(res){
        for(i in res){
            var barrier = Object.values(res[i]).slice(1,18);
            var index = barrier[0];
            barrierX[index + 3] = barrier.slice(1,9);
            barrierY[index + 3] = barrier.slice(9);
        };
        draw();
    });
});

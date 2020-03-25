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
                return "#666666";
            case 1:
                return "#555555";
            case 2:
                return "#444444";
            case 3:
                return "#333333";
            default:
                break;
        };
    };

    function floorSelect(dist){
        switch(dist){
            case 1:
                return "#999999";
            case 2:
                return "#888888";
            case 3:
                return "#777777";
            case 4:
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

    function horiWall(x,y,left,right,edge = false){
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
        if(edge){
            ctx.fillStyle = floorSelect(4);
        }
        else{
            ctx.fillStyle = greySelect(x,y);
        };
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
        };
        if(edge){
            ctx.fillStyle = floorSelect(4);
        }
        else{
            ctx.fillStyle = greySelect(x,y);
        };
        ctx.fill();
        ctx.closePath();
    };

    function lightLeft(x,y){
        var above = false;
        var below = false;
        if(barrierX[y+3][x+4] !== 0){
            if(x === -4){
                if(y < 0){
                    above = true;
                }
                else if(y > 0){
                    below = true;
                };
            }
            else{
                if(y < 0){
                    above = barrierX[y+4][x+4] !== 0 || barrierY[x+3][y+4] !== 0;
                }
                else if(y > 0){
                    below = barrierX[y+2][x+4] !== 0 || barrierY[x+3][y+3] !== 0;
                };
            };
            vertWall(x+1,y,above,below);
        }
        else if(x === -4){
            vertWall(x+1,y,y<0,y>0,true);
        }
        else{
            makeRectangle(70*(x+3)+8,70*(x+4)+8,70*(y+3)+8,70*(y+4),floorSelect(-x));

            function helper(up){
                ctx.beginPath();
                ctx.moveTo(70*(x+4)+8,498-70*(y+3+up)-8+8*up);
                ctx.lineTo(70*(x+3)+8,498-70*(y+3+up)-8+8*up);
                ctx.lineTo(70*(x+3)+8,498-70*(y+2+3*up)-8+8*up);
                ctx.fillStyle = floorSelect(-x);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.moveTo(70*(x+3)+8,498-70*(y+3+up)-8+8*up);
                ctx.lineTo(70*(x+3)+8,498-70*(y+3+up)-8*up);
                ctx.lineTo(70*(x+3),498-70*(y+3+up)-8*up);
                ctx.fillStyle = floorSelect(1-x);
                ctx.fill();
                ctx.closePath();
                lightLeft(x-1,y-1+2*up);
            };

            if(y >= 0){
                if(barrierY[x+3][y+4] !== 0){
                    var right = barrierY[x+4][y+4] !== 0 || barrierX[y+4][x+2] !== 0;
                    horiWall(x,y+1,false,right);
                }
                else{
                    helper(true);
                };
            };
            if(y <= 0){
                if(barrierY[x+3][y+3] !== 0){
                    var right = barrierY[x+4][y+3] !== 0 || barrierX[y+2][x+2] !== 0;
                    horiWall(x,y,false,right);
                }
                else{
                    helper(false);
                };
            };
            lightLeft(x-1,y);
        };
    };

    function lightRight(x,y){
        var above = false;
        var below = false;
        if(barrierX[y+3][x+3] !== 0){
            if(x === 4){
                if(y < 0){
                    above = true;
                }
                else if(y > 0){
                    below = true;
                };
            }
            else{
                if(y < 0){
                    above = barrierX[y+4][x+3] !== 0 || barrierY[x+3][y+4] !== 0;
                }
                else if(y > 0){
                    below = barrierX[y+2][x+3] !== 0 || barrierY[x+3][y+3] !== 0;
                };
            };
            vertWall(x,y,above,below);
        }
        else if(x === 4){
            vertWall(x,y,y<0,y>0,true);
        }
        else{
            makeRectangle(70*(x+3),70*(x+4),70*(y+3)+8,70*(y+4),floorSelect(x));

            function helper(up){
                ctx.beginPath();
                ctx.moveTo(70*(x+3),498-70*(y+3+up)-8+8*up);
                ctx.lineTo(70*(x+4),498-70*(y+3+up)-8+8*up);
                ctx.lineTo(70*(x+4),498-70*(y+2+3*up)-8+8*up);
                ctx.fillStyle = floorSelect(x);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.moveTo(70*(x+4),498-70*(y+3+up)-8+8*up);
                ctx.lineTo(70*(x+4),498-70*(y+3+up)-8*up);
                ctx.lineTo(70*(x+4)+8,498-70*(y+3+up)-8*up);
                ctx.fillStyle = floorSelect(x+1);
                ctx.fill();
                ctx.closePath();
                lightRight(x+1,y-1+2*up);
            };

            if(y >= 0){
                if(barrierY[x+3][y+4] !== 0){
                    var left = barrierY[x+2][y+4] !== 0 || barrierX[y+4][x+3] !== 0;
                    horiWall(x,y+1,left,false);
                }
                else{
                    helper(true);
                };
            };
            if(y <= 0){
                if(barrierY[x+3][y+3] !== 0){
                    var left = barrierY[x+2][y+3] !== 0 || barrierX[y+2][x+3] !== 0;
                    horiWall(x,y,left,false);
                }
                else{
                    helper(false);
                };
            };
            lightRight(x+1,y);
        };
    };

    function lightDown(x,y){
        var left = false;
        var right = false;
        if(barrierY[x+3][y+4] !== 0){
            if(y === -4){
                if(x > 0){
                    left = true;
                }
                else if(x < 0){
                    right = true;
                };
            }
            else{
                if(x > 0){
                    left = barrierY[x+2][y+4] !== 0 || barrierX[y+3][x+3] !== 0;
                }
                else if(x < 0){
                    right = barrierY[x+4][y+4] !== 0 || barrierX[y+3][x+4] !== 0;
                };
            };
            horiWall(x,y+1,left,right);
        }
        else if(y === -4){
            horiWall(x,y+1,x>0,x<0,true);
        }
        else{
            makeRectangle(70*(x+3)+8,70*(x+4),70*(y+3)+8,70*(y+4)+8,floorSelect(-y));

            function helper(right){
                ctx.beginPath();
                ctx.moveTo(70*(x+3+right)+8-8*right,498-70*(y+4)-8);
                ctx.lineTo(70*(x+3+right)+8-8*right,498-70*(y+3)-8);
                ctx.lineTo(70*(x+2+3*right)+8-8*right,498-70*(y+3)-8);
                ctx.fillStyle = floorSelect(-y);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.moveTo(70*(x+3+right)+8-8*right,498-70*(y+3)-8);
                ctx.lineTo(70*(x+3+right)+8*right,498-70*(y+3)-8);
                ctx.lineTo(70*(x+3+right)+8*right,498-70*(y+3));
                ctx.fillStyle = floorSelect(1-y);
                ctx.fill();
                ctx.closePath();
                lightDown(x-1+2*right,y-1);
            };

            if(x >= 0){
                if(barrierX[y+3][x+4] !== 0){
                    var above = barrierX[y+4][x+4] !== 0 || barrierY[x+4][y+4] !== 0;
                    vertWall(x+1,y,above,false);
                }
                else{
                    helper(true);
                };
            };
            if(x <= 0){
                if(barrierX[y+3][x+3] !== 0){
                    var above = barrierX[y+4][x+3] !== 0 || barrierY[x+2][y+4] !== 0;
                    vertWall(x,y,above,false);
                }
                else{
                    helper(false);
                };
            };
            lightDown(x,y-1);
        };
    };

    function lightUp(x,y){
        var left = false;
        var right = false;
        if(barrierY[x+3][y+3] !== 0){
            if(y === 4){
                if(x > 0){
                    left = true;
                }
                else if(x < 0){
                    right = true;
                };
            }
            else{
                if(x > 0){
                    left = barrierY[x+2][y+3] !== 0 || barrierX[y+3][x+3] !== 0;
                }
                else if(x < 0){
                    right = barrierY[x+4][y+3] !== 0 || barrierX[y+3][x+4] !== 0;
                };
            };
            horiWall(x,y,left,right);
        }
        else if(y === 4){
            horiWall(x,y,x>0,x<0,true);
        }
        else{
            makeRectangle(70*(x+3)+8,70*(x+4),70*(y+3),70*(y+4),floorSelect(y));

            function helper(right){
                ctx.beginPath();
                ctx.moveTo(70*(x+3+right)+8-8*right,498-70*(y+3));
                ctx.lineTo(70*(x+3+right)+8-8*right,498-70*(y+4));
                ctx.lineTo(70*(x+2+3*right)+8-8*right,498-70*(y+4));
                ctx.fillStyle = floorSelect(y);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.moveTo(70*(x+3+right)+8-8*right,498-70*(y+4));
                ctx.lineTo(70*(x+3+right)+8*right,498-70*(y+4));
                ctx.lineTo(70*(x+3+right)+8*right,498-70*(y+4)-8);
                ctx.fillStyle = floorSelect(y+1);
                ctx.fill();
                ctx.closePath();
                lightUp(x-1+2*right,y+1);
            };

            if(x >= 0){
                if(barrierX[y+3][x+4] !== 0){
                    var below = barrierX[y+2][x+4] !== 0 || barrierY[x+4][y+3] !== 0;
                    vertWall(x+1,y,false,below);
                }
                else{
                    helper(true);
                };
            };
            if(x <= 0){
                if(barrierX[y+3][x+3] !== 0){
                    var below = barrierX[y+2][x+3] !== 0 || barrierY[x+2][y+3] !== 0;
                    vertWall(x,y,false,below);
                }
                else{
                    helper(false);
                };
            };
            lightUp(x,y+1);
        };
    };

    function draw(){
        makeRectangle(0,498,0,498,"#000000");
        makeRectangle(218,280,218,280,"#F8C377");
        lightLeft(-1,0);
        lightRight(1,0);
        lightDown(0,-1);
        lightUp(0,1);
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

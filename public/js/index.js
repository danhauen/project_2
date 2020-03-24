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

    function makeRectangle(x1,x2,y1,y2,color) {
        ctx.beginPath();
        ctx.rect(x1, 498 - y2, x2 - x1, y2 - y1);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };

    function draw(){
        makeRectangle(0,498,0,498,"#888888");
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

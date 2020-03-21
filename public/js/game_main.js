$(document).ready(function(){
var canvas = $("#gameCanvas");
var ctx = canvas[0].getContext('2d')


function makeRectangle() {
ctx.beginPath();
ctx.rect(, , , );
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

};


makeRectangle();
});


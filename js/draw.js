const text = document.getElementById("test")
const canvas = document.getElementById("canvas")
const colorInp = document.getElementById("clrInp");
const sizeInp = document.getElementById("sizeInp")
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
var mouseX = 0;
var mouseY = 0;
var color = "#FF0000"

function draw(){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.arc(mouseX, mouseY, 10, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function erase(){
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.arc(mouseX, mouseY, 10, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}


function holdit(btn, start, speedup) {
    var t;

    var repeat = function () {
        draw();
        t = setTimeout(repeat, start);
        start = start / speedup;
    }

    btn.onmousedown = function() {
        repeat();
    }

    btn.onmouseup = function () {
        clearTimeout(t);
    }
};

holdit(canvas, 100, 10)

onmousemove = function(e){
    mouseX = (e.screenX - rect.left)
    mouseY = (e.screenY - rect.top - 70)
}

sizeInp.oninput = function(){
    if (sizeInp.value == "" || parseInt(sizeInp.value) < 1) orderQ.value = 1;

    if (parseInt(sizeInp.value) > 50) orderQ.value = 999;
}

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    init(75);
})
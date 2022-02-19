//Constant Variable
const text = document.getElementById("test")
const canvas = document.getElementById("canvas")
const colorInp = document.getElementById("clrInp");
const sizeInp = document.getElementById("sizeInp")

const penBtn = document.getElementById("pen");
const eraseBtn = document.getElementById("erase");
const clrBtn = document.getElementById("clear");

const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

//Variables
var mouseX = 0;
var mouseY = 0;
var size = 10;
var color = "#FF0000"
var mode = true;

canvas.width = innerWidth;
canvas.height = innerHeight;

//Functions
function draw(){
    console.log(color)
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.arc(mouseX, mouseY, size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function erase(){
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.arc(mouseX, mouseY, size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    console.log()
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}


function holdit(btn, start, speedup) {
    var t;

    var repeat = function () {
        if (mode){
            draw()
        } else {
            erase();
        }

        console.log(mode);
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

//Checkings
onmousemove = function(e){
    mouseX = (e.screenX - rect.left) * (canvas.width/rect.width)
    mouseY = (e.screenY - rect.top -70) * (canvas.height/rect.height)
}

sizeInp.oninput = function(){
    if (sizeInp.value == "" || parseInt(sizeInp.value) < 1) sizeInp.value = 1;

    if (parseInt(sizeInp.value) > 50) sizeInp.value = 50;

    if (!isNaN(parseInt(sizeInp.value))){
        size = parseInt(sizeInp.value)
    }
}

colorInp.onchange = function(){
    var reg=/^#([0-9a-f]{3}){1,2}$/i;
    if (reg.test(colorInp.value)){
        color = colorInp.value
    } else {
        colorInp.value = color;
    }
}

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
})

//Init Commands
colorInp.value = color;
sizeInp.value = size;

penBtn.onclick = function(){
    mode = true;
}

eraseBtn.onclick = function(){
    mode = false;
}

clrBtn.onclick = function(){
    clear();
}
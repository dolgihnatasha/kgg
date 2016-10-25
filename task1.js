
var canvas = document.getElementById('canvas');
var ctx     = canvas.getContext('2d');

var btn =    document.getElementById('submit_btn');
var a_btn =  document.getElementById('a');
var b_btn =  document.getElementById('b');
var c_btn =  document.getElementById('c');
var d_btn =  document.getElementById('d');
var e_btn =  document.getElementById('e');
var x1_btn = document.getElementById('x1');
var x2_btn = document.getElementById('x2');


canvas.width  = 1000;
canvas.height = 600;

var params = {
    x1: Number(x1_btn.value),
    x2: Number(x2_btn.value),
    a: Number(a_btn.value),
    b: Number(b_btn.value),
    c: Number(c_btn.value),
    d: Number(d_btn.value),
    e: Number(e_btn.value)
};


btn.addEventListener('click', function () {
    params = {
        x1: Number(x1_btn.value),
        x2: Number(x2_btn.value),
        a: Number(a_btn.value),
        b: Number(b_btn.value),
        c: Number(c_btn.value),
        d: Number(d_btn.value),
        e: Number(e_btn.value)
    };
    clear();
    draw();
});

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = '#dbe6f3';
    // ctx.rect(0, 0, canvas.width, canvas.height);
    // ctx.fill();
}

function f(x) {
    if (+(Math.abs(params.d * x + params.e)).toFixed(2) <= 0.04 ) {
        return NaN
    }
    return (params.a * x * x * x + params.b * x + params.c) / (params.d * x + params.e)
}

function draw() {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    // ctx.fillStyle = '#dbe6f3';
    var y_min = 100000000000000;
    var y_max = -100000000000000;
    var x;
    var y;
    for (var xx = 0; xx < canvas.width; xx++) {
        x = params.x1 + xx * ((params.x2 - params.x1) / canvas.width);
        y = f(x);
        if (y < y_min) {
            y_min = y
        }
        if (y > y_max) {
            y_max = y
        }
    }
    y = f(params.x1);
    ctx.moveTo(0, Math.trunc((y_max - y) * canvas.height / (y_max - y_min)));
    var yy;
    var prevNaN = isNaN(y);
    for (xx = 0; xx < canvas.width; xx++) {
        x = params.x1 + xx * ((params.x2 - params.x1) / canvas.width);
        y = f(x);
        yy = Math.trunc((y_max - y) * canvas.height / (y_max - y_min));
        if (prevNaN && !isNaN(y)) {
            ctx.moveTo(xx, yy);
        }
        if (!isNaN(y)) {
            ctx.lineTo(xx, yy);
        }
        prevNaN = isNaN(y);
    }
    ctx.stroke();
    // ctx.fill();
    ctx.closePath();
}

clear();
draw();

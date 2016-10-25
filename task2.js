
var canvas = document.getElementById('canvas');
var ctx     = canvas.getContext('2d');

var btn =    document.getElementById('submit_btn');
var a_btn =  document.getElementById('a');
var b_btn =  document.getElementById('b');
var c_btn =  document.getElementById('c');


canvas.width  = 1000;
canvas.height = 600;

var params = {
    a: Number(a_btn.value),
    b: Number(b_btn.value),
    c: Number(c_btn.value)
};


btn.addEventListener('click', function () {
    params = {
        a: Number(a_btn.value),
        b: Number(b_btn.value),
        c: Number(c_btn.value)
    };
    clear();
    draw();
});

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#dbe6f3';
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
}

function fx(x) {
    // console.log('fx(x):', x, (- params.c - params.a * x) / params.b);
    return (- params.c - params.a * x) / params.b
}

function fy(y) {
    // console.log('fy(y):', y, (- params.c - params.b * y) / params.a);
    return (- params.c - params.b * y) / params.a
}

function draw() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.moveTo(0, 0);
    var x1 = fy(0) <= 0 ? 0 : Math.abs(Math.round(fy(0)));
    var x2 = Math.min(Math.max(fy(canvas.height), 0), canvas.width);
    var y1 = Math.round(fx(x1));
    var y2 = Math.round(fx(x2));

    var dx = x2 - x1, dy = y2 - y1;
    var err = dx - dy;
    var signx = x1 < x2 ? 1 : -1;
    var signy = y1 < y2 ? 1 : -1;

    while (x1 != x2 || y1 != y2) {
        ctx.rect(x1, y1, 1, 1);
        if (err * 2 > -dy) {
            err -= dy;
            x1 += signx;
        }
        if (err < dx) {
            err += dx;
            y1 += signy
        }
    }
    ctx.fill();

}

clear();
draw();

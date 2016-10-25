
var canvas = document.getElementById('canvas');
var ctx     = canvas.getContext('2d');

var btn =    document.getElementById('submit_btn');
var a_btn =  document.getElementById('a');
var b_btn =  document.getElementById('b');


canvas.width  = 1000;
canvas.height = 600;

var params = {
    a: Number(a_btn.value),
    b: Number(b_btn.value)
};


btn.addEventListener('click', function () {
    params = {
        a: Number(a_btn.value),
        b: Number(b_btn.value)
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
    return (- Math.pow(params.b, 2) * Math.pow(params.a, 2) - x * x * Math.pow(params.b, 2))
}

function fy(y) {
    return (- Math.pow(params.b, 2) * Math.pow(params.a, 2) + y * y * Math.pow(params.a, 2))
}

function draw() {
    ctx.fillStyle = 'red';
    ctx.translate(canvas.width / 2, canvas.height / 2);
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


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
    hyperbola(params.a,params.b, canvas.width);
});

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#dbe6f3';
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
}

function draw(x, y) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect((x + canvas.width / 2),(canvas.height / 2 - y), 1, 1);

    ctx.fillRect((-x + canvas.width / 2),(canvas.height / 2 - y), 1, 1);

    ctx.fillRect((x + canvas.width / 2),(canvas.height / 2 + y), 1, 1);

    ctx.fillRect((-x + canvas.width / 2),(canvas.height / 2 + y), 1, 1);
    ctx.closePath();
}


function hyperbola(rx, ry, bound)
{
    var x, y, d, mida, midb;
    var tworx2, twory2, rx2, ry2;
    var x_slop,y_slop;

    y = ry;
    x = 0;

    ry2 = ry * ry;
    rx2 = rx * rx;

    twory2 = 2 * ry2;
    tworx2 = 2 * rx2;

    y_slop = 2 * tworx2 * ( y + 1 );
    x_slop = 2 * twory2;

    mida = x_slop / 2;
    midb = y_slop / 2;

    d = twory2 - rx2 * ( 1 + 2 * ry ) + mida;

    // var i = 0;

    while( ( d < y_slop ) && ( x <= bound )  )
    {
        draw(x,y);

        if( d >= 0 ) {
            d -= y_slop;
            y++;
            y_slop += 2 * twory2;
        }
        d += twory2 + x_slop;
        x++;
        x_slop += 2 * twory2;
    }

    d -= ( y_slop + x_slop ) / 2 + ( rx2 + ry2 ) - midb - mida;

    if ( ry > rx ) {
        while( x <= bound ) {
            draw(x, y);
            if( d <= 0 ) {
                d += x_slop;
                x++;
                x += 2 * twory2;
            }
            d -= tworx2 - y_slop;
            y++;
            y_slop += 2 * tworx2;
        }
    }
}


clear();
hyperbola(params.a,params.b, canvas.width);
(function() {
    var simplex = new SimplexNoise();

    function color(n, step) {
        var r = ~~(n * 255);
        var g = 127;
        var b = 127;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function setup(ctx) {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight * .6;
    }

    function draw(ctx, state, step) {
        var w = ctx.canvas.width;
        var h = ctx.canvas.height;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, w, h);

        ctx.lineWidth = 1;
        ctx.beginPath();

        var offset = w * 0.0075;
        var size = offset / 2;
        for (var y = size; y < h - size; y += offset) {
            for (var x = size; x < w - size; x += offset) {
                var n = Math.abs(simplex.noise3d(x/1000, y/1000, step/1000));
                var v = vector(n * 360, size);
                ctx.strokeStyle = color(n, step);
                ctx.moveTo(x, y);
                ctx.lineTo(x + v.x, y + v.y);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }

    function vector(angle, magnitude) {
        return {
            x: magnitude * Math.cos(angle),
            y: magnitude * Math.sin(angle),
        };
    }

    Muybridge.run({
        draw: draw,
        setup: setup,
    });
})();

(function() {
    'use strict';

    var simplex = new SimplexNoise();

    function color(n) {
        var r = (n * 255)|0;
        var g = 127;
        var b = 127;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function setupCanvas(canvas, ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function setupState(width, height) {
        var scale = window.devicePixelRatio > 1 ? 0.015 : 0.0075;
        var offset = Math.max(width, height) * scale;
        var size = offset / 2;
        return {
            w: width,
            h: height,
            offset: offset,
            size: size,
        }
    }

    function draw(ctx, state, step) {
        var w = state.w;
        var h = state.h;
        var offset = state.offset;
        var size = state.size;
        var x, y, n, a, rise, run;

        ctx.lineWidth = 1;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, w, h);

        ctx.beginPath();
        for (y = size; y < h - size; y += offset) {
            for (x = size; x < w - size; x += offset) {
                n = Math.abs(simplex.noise3d(x/1000, y/1000, step/1000));
                a = n * 360;
                rise = size * Math.sin(a);
                run = size * Math.cos(a);
                ctx.strokeStyle = color(n);
                ctx.moveTo(x, y);
                ctx.lineTo(x + run, y + rise);
            }
        }
        ctx.stroke();
    }

    Muybridge.run({
        draw: draw,
        setup: setupState,
        setupCanvas: setupCanvas,
    });
})();

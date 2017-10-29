(function() {
    'use strict';

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    var simplex = new SimplexNoise();

    function setupCanvas(canvas, ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function setupState(width, height) {
        var scale = window.devicePixelRatio > 1 ? 0.015 : 0.0075;
        var offset = Math.max(width, height) * scale;
        var segmentSize = offset / 2;
        return {
            w: width,
            h: height,
            segmentSize: segmentSize,
            lastPoint: new Point(0, 0),
        }
    }

    function draw(ctx, state, step) {
        var w = state.w;
        var h = state.h;
        var segmentSize = state.segmentSize;

        if (step * segmentSize > w + segmentSize) {
            return state;
        }

        var lastPoint = state.lastPoint;
        var px = lastPoint.x;
        var py = lastPoint.y;
        var offset = simplex.noise3d(px/100, py/100, step/100) * 5;
        var nx = step * segmentSize
        var ny = h/2 + offset;

        ctx.lineWidth = 1;
        ctx.beginPath();

        ctx.moveTo(px, py);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        state.lastPoint = new Point(nx, ny);
        return state;
    }

    Muybridge.run({
        draw: draw,
        setup: setupState,
        setupCanvas: setupCanvas,
    });
})();

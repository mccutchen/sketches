(function() {
    'use strict';

    var simplex = new SimplexNoise();

    function setupCanvas(canvas, ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function setupState(width, height) {
        var scale = window.devicePixelRatio > 1 ? 0.015 : 0.0075;
        var offset = Math.max(width, height) * scale;
        var segmentSize = offset / 2;
        var lineCount = height / segmentSize;

        var lastPoints = [];
        for (var i = 0; i < lineCount; i++) {
            lastPoints[i] = {x: 0, y: 0};
        }
        return {
            w: width,
            h: height,
            segmentSize: segmentSize,
            lastPoints: lastPoints,
        }
    }

    function draw(ctx, state, step) {
        var w = state.w;
        var h = state.h;
        var segmentSize = state.segmentSize;

        if (step * segmentSize > w + segmentSize) {
            return state;
        }

        ctx.lineWidth = 2;
        ctx.beginPath();

        var lastPoints = state.lastPoints;
        var nextPoints = [];
        for (var i = 0; i < lastPoints.length; i++) {
            var lastPoint = lastPoints[i];
            var px = lastPoint.x;
            var py = lastPoint.y;
            var offset = simplex.noise3d(px/100, py/100, step/100) * 5;
            var nx = step * segmentSize;
            var ny = i * segmentSize + offset;

            ctx.moveTo(px, py);
            ctx.lineTo(nx, ny);

            nextPoints.push({x: nx, y: ny});
        }
        ctx.stroke();

        state.lastPoints = nextPoints;
        return state;
    }

    Muybridge.run({
        draw: draw,
        setup: setupState,
        setupCanvas: setupCanvas,
    });
})();

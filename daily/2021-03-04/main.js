(function () {
    'use strict';

    const simplex = new SimplexNoise();

    function noise(x, y) {
        return simplex.noise(x / 100 + 1, y / 10 + 1);
    }

    function setupCanvas(canvas, ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function setupState(width, height) {
        // Pick the step between lines on device resolution and
        // orientation
        const scale = window.devicePixelRatio > 1 ? 0.015 : 0.0075;
        const stepSize = (Math.max(width, height) * scale) / 2;
        const lineCount = height / stepSize;
        const gapSize = stepSize / 2;
        return {
            width,
            height,
            stepSize,
            lineCount,
            gapSize,
        }
    }

    function draw(ctx, state, step) {
        const {
            width,
            height,
            stepSize,
            lineCount,
            gapSize,
        } = state;

        var x, y, segmentWidth;

        ctx.fillStyle = '#eee';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;

        ctx.beginPath();
        for (y = 0; y < lineCount; y++) {
            x = 0;
            while (x < width) {
                segmentWidth = noise(x, y, step) * (stepSize * 10) + (stepSize * 10);
                ctx.moveTo(x + (x === 0 ? 0 : gapSize), y * stepSize);
                ctx.lineTo(x + segmentWidth, y * stepSize);
                x += segmentWidth;
            }
        }
        ctx.stroke();

        if (Math.random() < 0.25) {
            console.log(step);
        }
        return state;
    }

    Muybridge.run({
        draw: draw,
        setup: setupState,
        setupCanvas: setupCanvas,
    });
})();

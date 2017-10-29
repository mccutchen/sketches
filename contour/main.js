(function() {
    'use strict';

    var simplex = new SimplexNoise();

    function setupCanvas(canvas, ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function noise(x, y) {
        return simplex.noise(x/100, y/10) * 10;
    }

    function setupState(width, height) {
        // Pick the size of our line segment based on device resolution and
        // orientation
        var scale = window.devicePixelRatio > 1 ? 0.015 : 0.0075;
        var segmentSize = (Math.max(width, height) * scale) / 2;

        // We'll render a sequence of lines where each line is made up of
        // segments
        var lineCount = height / segmentSize;
        var segmentCount = width / segmentSize + 1;

        // Initialize our lines, which are just arrays of y offsets
        var lines = [];
        var line, x, y;
        for (y = 0; y < lineCount; y++) {
            line = []
            for (x = 0; x < segmentCount; x++) {
                line.push(noise(x, y));
            }
            lines.push(line);
        }

        return {
            w: width,
            h: height,
            segmentSize: segmentSize,
            lines: lines,
        }
    }

    function draw(ctx, state, step) {
        var {w, h, segmentSize, lines} = state;
        var line, x, y, offset, nextOffset;

        ctx.fillStyle = '#FF3D7F';
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(255,255,255,0.25)';
        ctx.lineWidth = 2;

        ctx.beginPath();
        for (y = 0; y < lines.length; y++) {
            line = lines[y];
            for (x = 0; x < line.length - 1; x++) {
                offset = line[x]
                nextOffset = line[x+1];
                ctx.moveTo(x * segmentSize, y * segmentSize + offset);
                ctx.lineTo((x + 1) * segmentSize, y * segmentSize + nextOffset);
            }

            line.shift();
            line.push(noise(x + step, y));
        }
        ctx.stroke();

        return state;
    }

    Muybridge.run({
        draw: draw,
        setup: setupState,
        setupCanvas: setupCanvas,
    });
})();

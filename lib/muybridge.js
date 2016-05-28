var Muybridge = (function() {
    /**
     * Create and run an animation.
     */
    function run(opts) {
        console.log('running sketch', opts);
        var draw = opts.draw;
        var setup = opts.setup || function() {};
        var update = opts.update || function(state) { return state; }

        var canvas = opts.canvas;
        var container = opts.container || document.body;

        if (canvas === undefined) {
            canvas = document.createElement('canvas');
            container.appendChild(canvas);
        }

        var ctx = canvas.getContext('2d');
        var step = 0;
        var initialState = setup(ctx);

        // Autoscale the canvas for hi-dpi screens by default
        if (opts.autoScaleCanvas !== false) {
            autoScaleCanvas(canvas, ctx);
        }

        (function loop(state, step) {
            window.requestAnimationFrame(function frame() {
                draw(ctx, state, step);
                loop(update(state, step), step + 1);
            }, canvas);
        })(initialState, 0);
    }

    function autoScaleCanvas(canvas, ctx) {
        // http://www.html5rocks.com/en/tutorials/canvas/hidpi/
        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                                ctx.mozBackingStorePixelRatio ||
                                ctx.msBackingStorePixelRatio ||
                                ctx.oBackingStorePixelRatio ||
                                ctx.backingStorePixelRatio ||
                                1;

        var ratio = devicePixelRatio / backingStoreRatio;

        if (devicePixelRatio === backingStoreRatio) {
            return;
        }

        var w = canvas.width;
        var h = canvas.height;
        canvas.width = w * ratio;
        canvas.height = h * ratio;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.scale(ratio, ratio);
    }

    return {
        run: run,
    }
})();

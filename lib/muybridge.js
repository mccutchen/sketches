var Muybridge = {
    /**
     * Create and run an animation.
     */
    run: function(opts) {
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

        (function loop(state, step) {
            window.requestAnimationFrame(function() {
                draw(ctx, state, step);
                loop(update(state, step), step + 1);
            }, canvas);
        })(initialState, 0);
    }
};

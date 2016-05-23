function setup(ctx) {
    var img = document.getElementById('input'),
        w = img.width,
        h = img.height;

    ctx.canvas.width = w;
    ctx.canvas.height = h;
    ctx.drawImage(img, 0, 0);

    return {
        particles: makeParticles(ctx),
        w: w,
        h: h
    };
}


function draw(ctx, state, step) {
    var particles = state.particles,
        length = particles.length,
        w = state.w,
        h = state.h;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, w, h);
    for (var i = length - 1; i >= 0; i--) {
        particles[i].draw(ctx, w, h);
    }
    return state;
}


function makeParticles(ctx) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        pixels = ctx.getImageData(0, 0, w, h).data,
        result = [],
        x, y, offset,
        r, g, b, a;

    for (y = 0; y < h; y++) {
        for(x = 0; x < w; x++) {
            offset = (y * w + x) * 4;
            r = pixels[offset];
            g = pixels[offset+1];
            b = pixels[offset+2];
            a = pixels[offset+3] / 255;
            if (a === 0 || r + g + b === 0 || r + g + b === 255 * 3) {
                continue;
            }
            result.push(new Particle(x, y, chroma(r, g, b, a)));
        }
    }
    console.log('%d/%d particles', result.length, w * h);
    return result;
}


// Need to wait for 'load' to ensure that our image has its data.
window.addEventListener('load', function() {
    Muybridge.run({
        draw: draw,
        setup: setup,
        canvas: document.getElementById('output')
    });
});

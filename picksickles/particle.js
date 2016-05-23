// A particle is just a thing with a position and a color.
function Particle(x, y, color) {
    this.position = new Vector(x, y);
    this.velocity = colorToVelocity(color);
    this.color = color.css();
}

// Draw a particle and update its position.
Particle.prototype.draw = function(ctx, w, h) {
    var x = (0.5 + this.position.x) << 0;
    var y = (0.5 + this.position.y) << 0;
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, 1, 1);

    this.position.add(this.velocity);
    this.position.x %= w;
    this.position.y %= h;
};

// Transform a particle's color into a velocity. The HSV/HSL colorspaces are
// handy for this, because the hue is specified as an angle from 0 to 360
// degrees.
var colorToVelocity = (function() {
    var offset = Math.random() * 360;
    return function colorToVelocity(color) {
        var components = color.hsv();
        var h = components[0];
        var s = components[1];
        var v = components[2];
        return Vector.fromAngle(h + offset, s * v * (h/10));
    }
})();

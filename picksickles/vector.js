var Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Vector.fromAngle = function(angle, mag) {
    return new Vector(mag * Math.cos(angle), mag * Math.sin(angle));
};

Vector.prototype.magnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.scale = function(n) {
    this.x *= n;
    this.y *= n;
};

Vector.prototype.add = function(v) {
    this.x += v.x;
    this.y += v.y;
};

Vector.prototype.normalize = function() {
    var m = this.magnitude();
    return (m === 0) ? this.scale(0) : this.scale(1/m);
};

Vector.prototype.zero = function() {
    this.x = 0;
    this.y = 0;
};

Vector.prototype.validate = function() {
    if (isNaN(this.x + this.y)) {
        return this.zero();
    } else {
        return this;
    }
};

Vector.prototype.toString = function() {
    return 'Vector(' + this.x + ',' + this.y + ')';
};

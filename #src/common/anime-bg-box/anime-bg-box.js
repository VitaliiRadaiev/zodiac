function Vector2(x, y) {

    this.x = x || 0;
    this.y = y || 0;

}

Object.defineProperties(Vector2.prototype, {

    "width": {

        get: function () {

            return this.x;

        },

        set: function (value) {

            this.x = value;

        }

    },

    "height": {

        get: function () {

            return this.y;

        },

        set: function (value) {

            this.y = value;

        }

    }

});

Object.assign(Vector2.prototype, {

    isVector2: true,

    set: function (x, y) {

        this.x = x;
        this.y = y;

        return this;

    },

    setScalar: function (scalar) {

        this.x = scalar;
        this.y = scalar;

        return this;

    },

    setX: function (x) {

        this.x = x;

        return this;

    },

    setY: function (y) {

        this.y = y;

        return this;

    },

    setComponent: function (index, value) {

        switch (index) {

            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error('index is out of range: ' + index);

        }

        return this;

    },

    getComponent: function (index) {

        switch (index) {

            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('index is out of range: ' + index);

        }

    },

    clone: function () {

        return new this.constructor(this.x, this.y);

    },

    copy: function (v) {

        this.x = v.x;
        this.y = v.y;

        return this;

    },

    add: function (v, w) {

        if (w !== undefined) {

            console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
            return this.addVectors(v, w);

        }

        this.x += v.x;
        this.y += v.y;

        return this;

    },

    addScalar: function (s) {

        this.x += s;
        this.y += s;

        return this;

    },

    addVectors: function (a, b) {

        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;

    },

    addScaledVector: function (v, s) {

        this.x += v.x * s;
        this.y += v.y * s;

        return this;

    },

    sub: function (v, w) {

        if (w !== undefined) {

            console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
            return this.subVectors(v, w);

        }

        this.x -= v.x;
        this.y -= v.y;

        return this;

    },

    subScalar: function (s) {

        this.x -= s;
        this.y -= s;

        return this;

    },

    subVectors: function (a, b) {

        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;

    },

    multiply: function (v) {

        this.x *= v.x;
        this.y *= v.y;

        return this;

    },

    multiplyScalar: function (scalar) {

        this.x *= scalar;
        this.y *= scalar;

        return this;

    },

    divide: function (v) {

        this.x /= v.x;
        this.y /= v.y;

        return this;

    },

    divideScalar: function (scalar) {

        return this.multiplyScalar(1 / scalar);

    },

    min: function (v) {

        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);

        return this;

    },

    max: function (v) {

        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);

        return this;

    },

    clamp: function (min, max) {

        // assumes min < max, componentwise

        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));

        return this;

    },

    clampScalar: function () {

        var min = new Vector2();
        var max = new Vector2();

        return function clampScalar(minVal, maxVal) {

            min.set(minVal, minVal);
            max.set(maxVal, maxVal);

            return this.clamp(min, max);

        };

    }(),

    clampLength: function (min, max) {

        var length = this.length();

        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

    },

    floor: function () {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;

    },

    ceil: function () {

        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;

    },

    round: function () {

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;

    },

    roundToZero: function () {

        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);

        return this;

    },

    negate: function () {

        this.x = - this.x;
        this.y = - this.y;

        return this;

    },

    dot: function (v) {

        return this.x * v.x + this.y * v.y;

    },

    lengthSq: function () {

        return this.x * this.x + this.y * this.y;

    },

    length: function () {

        return Math.sqrt(this.x * this.x + this.y * this.y);

    },

    lengthManhattan: function () {

        return Math.abs(this.x) + Math.abs(this.y);

    },

    normalize: function () {

        return this.divideScalar(this.length() || 1);

    },

    angle: function () {

        // computes the angle in radians with respect to the positive x-axis

        var angle = Math.atan2(this.y, this.x);

        if (angle < 0) angle += 2 * Math.PI;

        return angle;

    },

    distanceTo: function (v) {

        return Math.sqrt(this.distanceToSquared(v));

    },

    distanceToSquared: function (v) {

        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;

    },

    distanceToManhattan: function (v) {

        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);

    },

    setLength: function (length) {

        return this.normalize().multiplyScalar(length);

    },

    lerp: function (v, alpha) {

        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;

        return this;

    },

    lerpVectors: function (v1, v2, alpha) {

        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

    },

    equals: function (v) {

        return ((v.x === this.x) && (v.y === this.y));

    },

    fromArray: function (array, offset) {

        if (offset === undefined) offset = 0;

        this.x = array[offset];
        this.y = array[offset + 1];

        return this;

    },

    toArray: function (array, offset) {

        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;

        array[offset] = this.x;
        array[offset + 1] = this.y;

        return array;

    },

    fromBufferAttribute: function (attribute, index, offset) {

        if (offset !== undefined) {

            console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');

        }

        this.x = attribute.getX(index);
        this.y = attribute.getY(index);

        return this;

    },

    rotateAround: function (center, angle) {

        var c = Math.cos(angle), s = Math.sin(angle);

        var x = this.x - center.x;
        var y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;

        return this;

    }

});


function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

class Pointer {
    constructor(domElement, { scaleMin = 0.01, scaleMax = 10.0, pressureMax = 1.0, pressureDuration = 1000 } = {}) {
        if (Pointer.instance) {
            return Pointer.instance;
        }

        this.dom = domElement;
        this.opt = { scaleMin, scaleMax, pressureMax, pressureDuration };
        this.pressCheckInterval = 20;
        this.deltaPressure = this.opt.pressureMax / this.opt.pressureDuration * this.pressCheckInterval;

        this.position = new Vector2();
        this.zoomSpeed = 1.0;
        this.scale = 1.0;
        this.dollyStart = new Vector2();
        this.dollyEnd = new Vector2();
        this.dollyDelta = new Vector2();

        this.addMoveListener(this.onMove.bind(this));
        this.addDownListener(this.onDown.bind(this));
        this.addUpListener(this.onUp.bind(this));

        this.dom.addEventListener('touchstart', this._onTouchZoomStart, false);
        this.addZoomListener(this.onZoom.bind(this));
        this.isPressing = false;
        this.pressure = 0.0;

        Pointer.instance = this;
    }

    get zoomScale() {
        return Math.pow(0.95, this.zoomSpeed);
    }
    setScale(val) {
        this.scale = clamp(val, this.opt.scaleMin, this.opt.scaleMax);
    }

    updatePosition(clientX, clientY) {
        let size = Math.min(this.dom.clientWidth, this.dom.clientHeight);
        this.position.x = (clientX * 2 - this.dom.clientWidth) / size;
        this.position.y = ((this.dom.clientHeight - clientY) * 2 - this.dom.clientHeight) / size;
    }

    onMove(e) {
        let x, y;
        if (e.touches) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }
        this.updatePosition(x, y);
        // e.preventDefault();
    }
    addMoveListener(cb) {
        ['mousemove', 'touchmove'].forEach(evtName => {
            this.dom.addEventListener(evtName, cb, false);
        });
    }

    setPressure(val) {
        let valid = val <= this.opt.pressureMax && val >= 0.0;
        this.pressure = clamp(val, 0.0, this.opt.pressureMax);
        //   console.log(this.pressure);
        return valid;
    }
    onDown(e) {
        if (e instanceof MouseEvent && e.button !== Pointer.BUTTON.MOUSE_LEFT) {
            return;
        }

        this.isPressing = true;
        if (e.touches) {
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            this.updatePosition(x, y);
        }


        let intervalID = setInterval(() => {
            if (!this.isPressing || !this.setPressure(this.pressure + this.deltaPressure)) {
                clearInterval(intervalID);
            }
        }, this.pressCheckInterval);

        let pressingTest = setInterval(() => {
            if (this.isPressing) {
                var event = new CustomEvent('Pointer.pressing', { detail: this.pressure });
                this.dom.dispatchEvent(event);
            } else {
                clearInterval(pressingTest);
            }
        }, this.pressCheckInterval);
    }
    addDownListener(cb) {
        ['mousedown', 'touchstart'].forEach(evtName => {
            this.dom.addEventListener(evtName, cb, false);
        });
    }

    addPressingListener(cb) {
        ['Pointer.pressing', 'Pointer.postpressing'].forEach(evtName => {
            this.dom.addEventListener(evtName, cb, false);
        });
    }
    addPressingEndListener(cb) {
        this.dom.addEventListener('Pointer.pressingEnd', cb, false);
    }

    onUp(e) {
        if (e instanceof MouseEvent && e.button !== Pointer.BUTTON.MOUSE_LEFT) {
            return;
        }

        this.isPressing = false;
        let intervalID = setInterval(() => {
            if (this.isPressing || !this.setPressure(this.pressure - this.deltaPressure)) {
                var event = new CustomEvent('Pointer.pressingEnd', { detail: this.pressure });
                this.dom.dispatchEvent(event);
                clearInterval(intervalID);
            } else {
                var event = new CustomEvent('Pointer.postpressing', { detail: this.pressure });
                this.dom.dispatchEvent(event);
            }
        }, this.pressCheckInterval);
    }
    addUpListener(cb) {
        ['mouseup', 'touchend'].forEach(evtName => {
            this.dom.addEventListener(evtName, cb, false);
        });
    }

    _onTouchZoomStart(e) {
        if (e.touches.length !== 2) return;
        let dx = e.touches[0].pageX - e.touches[1].pageX;
        let dy = e.touches[0].pageY - e.touches[1].pageY;
        this.dollyStart.set(0, Math.sqrt(dx * dx + dy * dy));
    }
    _onTouchZoom(e) {
        var dx = e.touches[0].pageX - e.touches[1].pageX;
        var dy = e.touches[0].pageY - e.touches[1].pageY;
        this.dollyEnd.set(0, Math.sqrt(dx * dx + dy * dy));

        this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
        if (dollyDelta.y > 0) {
            this.zoomOut();
        } else if (dollyDelta.y < 0) {
            this.zoomIn();
        }

        this.dollyStart.copy(this.dollyEnd);
    }
    _onWheelZoom(e) {
        if (e.deltaY > 0) {
            this.zoomOut();
        } else if (e.deltaY < 0) {
            this.zoomIn();
        }
        e.preventDefault(); // prevent page scroll down
    }
    onZoom(e) {
        if (e.touches) {
            this._onTouchZoom(e);
        } else {
            this._onWheelZoom(e);
        }
    }
    addZoomListener(cb) {
        ['wheel', 'touchmove'].forEach(evtName => {
            if (evtName === 'touchmove') {
                cb = (e) => {
                    return e.touches.length === 2 ? cb(e) : undefined;
                }
            }
            this.dom.addEventListener(evtName, cb, false);
        });
    }

    zoomIn(scaleFactor = this.zoomScale) {
        this.setScale(this.scale * scaleFactor);
    }
    zoomOut(scaleFactor = this.zoomScale) {
        this.setScale(this.scale / scaleFactor);
    }
}
Pointer.instance = null;
Pointer.BUTTON = {
    MOUSE_LEFT: 0,
    MOUSE_MIDDLE: 1,
    MOUSE_RIGHT: 2
}


let animeBgBoxes = document.querySelectorAll('.anime-bg-box__bg');
if (animeBgBoxes.length) {
    animeBgBoxes.forEach(animeBgBox => {
        const regl = createREGL(animeBgBox);

        const DEV = false;
        const seed = DEV ? 38975.579831 : new Date().getTime() % 100000;
        
        const pointer = new Pointer(regl._gl.canvas);
        let lastPressingT, dtSec = 0, morphAmount = 0;
        pointer.addPressingListener(e => {
            lastPressingT = lastPressingT || Date.now();
            const nowInMs = Date.now();
            dtSec = (nowInMs - lastPressingT) / 1000;
            lastPressingT = nowInMs;

            morphAmount += dtSec * pointer.pressure * 0.1;
        });

        // Calling regl() creates a new partially evaluated draw command
        const draw = regl({
            // Shaders in regl are just strings.  You can use glslify or whatever you want
            // to define them.  No need to manually create shader objects.
            frag: `
    // Fork from http://glslsandbox.com/e#8143.0
    precision mediump float;
    #define SEED ${seed}.579831

    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMorph;
    uniform vec2 uGrid;

    const int   complexity  = 10;   // complexity of curls/computation
    const float mouseSpeed  = 0.3;  // control the color changing
    const float fixedOffset = 0.7;  // Drives complexity in the amount of curls/cuves.  Zero is a single whirlpool.
    const float fluidSpeed  = 0.1; // Drives speed, smaller number will make it slower.
    const float baseColor   = 0.5;
    const float BLUR        = 0.47;

    #define PI 3.14159

    // more about noise: 
    // http://thebookofshaders.com/11/
    float random(float x) {
      return fract(sin(x) * SEED);
    }
    float noise(float x) {
      float i = floor(x);
      float f = fract(x);
      return mix(random(i), random(i + 1.0), smoothstep(0.0, 1.0, f));
    }
    float noiseS(float x) {
      return noise(x) * 2.0 - 1.0;
    }

    void main() {
      vec2 p = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y) * 0.7;
      float t = uTime * fluidSpeed + uMorph;
      float noiseTime = noise(t);
      float noiseSTime = noiseS(t);
      float noiseSTime1 = noiseS(t + 1.0);

      float blur = (BLUR + 0.14 * noiseSTime);
      for(int i=1; i <= complexity; i++) {
        p += blur / float(i) * sin(
            float(i) * p.yx + t + PI * vec2(noiseSTime, noiseSTime1))
          + fixedOffset;
      }
      for(int i=1; i <= complexity; i++) {
        p += blur / float(i) * cos(
            float(i) * p.yx + t + PI * vec2(noiseSTime, noiseSTime1))
          + fixedOffset;
      }
      p += uMouse * mouseSpeed;

      vec2 grid = uGrid * 2.0; // set complexity to 0 to debug the grid
      gl_FragColor = vec4(
        0.4 * vec3(
            sin(grid * p + vec2(5.0 * noiseSTime, 5.0 * noiseSTime1)),
            sin(p.x + p.y + noiseSTime)
          )
          + 0.7,
        1.0);
    }
  `,

            vert: `
    attribute vec2 position;
    void main () {
      gl_Position = vec4(position, 0, 1);
    }
  `,

            // Here we define the vertex attributes for the above shader
            attributes: {
                // regl.buffer creates a new array buffer object
                position: regl.buffer([
                    [-1, -1], [1, -1], [-1, 1],  // no need to flatten nested arrays, regl automatically
                    [-1, 1], [1, 1], [1, -1]     // unrolls them into a typedarray (default Float32)
                ])

                // regl automatically infers sane defaults for the vertex attribute pointers
            },

            uniforms: {
                uResolution: ({ viewportWidth, viewportHeight }) => [
                    viewportWidth, viewportHeight
                ],
                uTime: ({ tick }) => 0.01 * tick,
                uMouse: () => [pointer.position.x, pointer.position.y],
                uMorph: () => morphAmount,
                uRandomSeed: DEV ? 138975.579831 : new Date().getTime() % 1000000, //
                uGrid: ({ viewportWidth, viewportHeight }) => {
                    const ratio = 0.32;
                    return viewportHeight >= viewportWidth ? [1, viewportHeight / viewportWidth * ratio]
                        : [viewportWidth / viewportHeight * ratio, 1]
                }
            },

            // This tells regl the number of vertices to draw in this command
            count: 6
        });

        // regl.frame() wraps requestAnimationFrame and also handles viewport changes
        regl.frame(() => {
            draw();
        })
    })
}
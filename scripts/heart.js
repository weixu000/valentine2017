(function () {
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var trails = [],
        heartPath = [];
    var width, height;

    var v = 32; // num trails, num particles per trail & num nodes in heart path
    var Y = 6.3; // close to 44/7 or Math.PI * 2 - 6.3 seems is close enough. 

    window.onresize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        var size = Math.min(width, height);
        heartPath = [];
        for (var i = 0; i < Y; i += .2) { // calculate heart nodes, from http://mathworld.wolfram.com/HeartCurve.html
            heartPath.push([
                width / 2 + 180 * size / 500 * Math.pow(Math.sin(i), 3),
                height / 2 + 10 * size / 500 * (-(15 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i)))
            ]);
        }
    }
    window.onresize();

    for (var i = 0; i < v; i++) {
        var x = Math.random() * width,
            y = Math.random() * height;
        var H = i / v * 80 + 280,
            S = Math.random() * 40 + 60,
            B = Math.random() * 60 + 20;
        var trail = []; // create new trail

        for (var k = 0; k < v; k++) {
            trail.push({ // create new particle
                x: x, // position 
                y: y,
                velX: 0, // velocity
                velY: 0,
                rad: (1 - k / v) + 1, // radius
                acc: Math.random() + 1, // acceleration 
                targ: ~~(Math.random() * v), // target node on heart path
                direc: i % 2 * 2 - 1, // direction around heart path
                fric: Math.random() * .2 + .7, // friction
                color: "hsla(" + ~~H + "," + ~~S + "%," + ~~B + "%,.1)"
            });
        }
        trails.push(trail);
    }

    function render(particle) { // draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.rad, 0, Y, 1);
        ctx.closePath();
        ctx.fill();
    }

    setInterval(() => {
        ctx.fillStyle = "rgba(0,0,0,.2)"; // clear screen
        ctx.fillRect(0, 0, width, height);

        for (var i = v - 1; i >= 0; i--) {
            var trail = trails[i]; // get worm
            var fst = trail[0]; // get 1st particle of worm
            var tarX = heartPath[fst.targ][0] - fst.x, // calc distance
                tarY = heartPath[fst.targ][1] - fst.y;
            var dist = Math.sqrt((tarX * tarX) + (tarY * tarY));

            if (dist < 10) { // has trail reached target node?
                if (Math.random() > .95) { // randomly send a trail elsewhere
                    fst.targ = ~~(Math.random() * v);
                } else {
                    if (Math.random() > .99) fst.direc *= -1; // randomly change direction
                    fst.targ += fst.direc;
                    fst.targ %= v;
                    if (fst.targ < 0) fst.targ += v;
                }
            }

            fst.velX += tarX / dist * fst.acc; // calculate velocity
            fst.velY += tarY / dist * fst.acc;

            fst.x += fst.velX; // apply velocity
            fst.y += fst.velY;

            render(fst); // draw the first particle

            fst.velX *= fst.fric; // apply friction
            fst.velY *= fst.fric;

            for (var k = 0; k < v - 1; k++) {
                var t = trail[k], // this particle
                    n = trail[k + 1]; // next particle

                n.x -= (n.x - t.x) * .7; // use zenos paradox to create trail
                n.y -= (n.y - t.y) * .7;

                render(n);
            }
        }
    }, 25);
})();
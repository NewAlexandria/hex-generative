// Fingerprints. Created by Reinder Nijhoff 2021 - @reindernijhoff
//
// https://turtletoy.net/turtle/70e2e00c6f
//


const seed = 1; // min=1, max=100, step=1
const grid = 5; // min=1, max=10, step=1
const radius = 1.6; // min=0.1, max=5, step=0.01
const maxPathLength = 30;  // min=1, max=100, step=0.1
const maxTries = 1000;

function Translate(x,y) { return p => [p[0]+x, p[1]+y]; }
function Scale(s) { return p => [p[0]*s, p[1]*s]; }

class FingerPrint {
    constructor(seed, radius, x, y, grid) {
        this.noise = new SimplexNoise(seed);
        this.grid  = new PoissonDiscGrid(radius);    
        this.radius = radius;
        this.seed = seed;
        
        this.frequency = this.random(2, 4);
        this.yGradient = this.random(0.02, 0.07);
        this.poleStrength = this.random(0, 50);
        this.xOffset   = this.random(-15, 15);
        this.yOffset   = this.random(-0, 40);
        this.xShear    = this.random(-.25, .25);
        this.yShear    = this.random(-.25, .25);
        this.yScale    = this.random(.5, 1);
        
        this.turtle = new Tortoise();
        this.turtle.degrees(Math.PI * 2);
        this.turtle.traveled = 0;
        
        this.turtle.addTransform(Scale(1.4 / grid));
        this.turtle.addTransform(Translate((x+.5)*180/grid-90, -(y+.5)*180/grid+90));
    }
    
    hash() {
        let r = 1103515245 * (((this.seed) >> 1) ^ (this.seed++));
        r = 1103515245 * (r ^ (r>>3));
        r = r ^ (r >> 16);
        return r / 1103515245 % 1;	
    }
    
    random(min, max) {
        const v = this.hash();
        return v * min + (1-v) * max;
    }
    
    fbm(x, y) {
        let v = this.yGradient * y + this.poleStrength / 
            (3. + .3 * Math.hypot(x+this.xOffset+y*this.xShear, (y+this.yOffset+x*this.yShear) * this.yScale));
    
        x *= this.frequency / 1000;
        y *= this.frequency / 1000;
        let f = 1.;
        for (let i=0; i<3; i++) {
            v += this.noise.noise2D([x * f, y * f]) / f;
            f *= 2; x += 32;
        }
        return v;
    }
    
    curlNoise(x, y) {
        const eps = 0.01;
        
        const dx = (this.fbm(x, y + eps) - this.fbm(x, y - eps))/(2 * eps);
        const dy = (this.fbm(x + eps, y) - this.fbm(x - eps, y))/(2 * eps);
        
        const l = Math.hypot(dx, dy) / this.radius * .99;
        return [dx / l, -dy / l];	
    }
    
    draw() {
        const p = this.turtle.pos();
    
        const curl = this.curlNoise(p[0], p[1]);
        const dest = [p[0]+curl[0], p[1]+curl[1]];
        
        if (this.turtle.traveled < maxPathLength && 
            Math.hypot(dest[0], dest[1] * .7) < 33 + 5 * this.noise.noise2D([p[0]*0.01, p[1]*0.01]) && this.grid.insert(dest)) {
            this.turtle.goto(dest);
            this.turtle.traveled += Math.hypot(curl[0], curl[1]);
        } else {
            this.turtle.traveled = 0;
            let r, i = 0;
            do { 
                r =[Math.random()*200-100, Math.random()*200-100];
                i ++;
            } while(!this.grid.insert(r) && i < maxTries);
            if (i >= maxTries) {
                return false;
            }
            this.turtle.jump(r);
        }
        return true;
    }
}

const fps = [];
for (let x=0; x<grid; x++) {
    for (let y=0; y<grid; y++) {
        fps.push(new FingerPrint(y + (seed << x) + (seed << y), radius, x, y, grid));
    }
}
let fp = fps.pop();

function walk(i) {
    if (!fp.draw()) {
        fp = fps.pop();
    }
    return fp ? true : false;
}

////////////////////////////////////////////////////////////////
// Simplex Noise utility code. Created by Reinder Nijhoff 2020
// https://turtletoy.net/turtle/6e4e06d42e
// Based on: http://webstaff.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
////////////////////////////////////////////////////////////////
function SimplexNoise(seed = 1) {
	const grad = [  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
	            	[1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
            		[0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1] ];
	const perm = new Uint8Array(512);
            		
	const F2 = (Math.sqrt(3) - 1) / 2, F3 = 1/3;
	const G2 = (3 - Math.sqrt(3)) / 6, G3 = 1/6;

	const dot2 = (a, b) => a[0] * b[0] + a[1] * b[1];
	const sub2 = (a, b) => [a[0] - b[0], a[1] - b[1]];
	const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];

	class SimplexNoise {
		constructor(seed = 1) {
			for (let i = 0; i < 512; i++) {
				perm[i] = i & 255;
			}
			for (let i = 0; i < 255; i++) {
				const r = (seed = this.hash(i+seed)) % (256 - i)  + i;
				const swp = perm[i];
				perm[i + 256] = perm[i] = perm[r];
				perm[r + 256] = perm[r] = swp;
			}
		}
		noise2D(p) {
			const s = dot2(p, [F2, F2]);
			const c = [Math.floor(p[0] + s), Math.floor(p[1] + s)];
			const i = c[0] & 255, j = c[1] & 255;
			const t = dot2(c, [G2, G2]);

			const p0 = sub2(p, sub2(c, [t, t]));
			const o  = p0[0] > p0[1] ? [1, 0] : [0, 1];
			const p1 = sub2(sub2(p0, o), [-G2, -G2]);
			const p2 = sub2(p0, [1-2*G2, 1-2*G2]);
			
			let n =  Math.max(0, 0.5-dot2(p0, p0))**4 * dot2(grad[perm[i+perm[j]] % 12], p0);
			    n += Math.max(0, 0.5-dot2(p1, p1))**4 * dot2(grad[perm[i+o[0]+perm[j+o[1]]] % 12], p1);
		    	n += Math.max(0, 0.5-dot2(p2, p2))**4 * dot2(grad[perm[i+1+perm[j+1]] % 12], p2);
			
			return 70 * n;
		}
		hash(i) {
            i = 1103515245 * ((i >> 1) ^ i);
            const h32 = 1103515245 * (i ^ (i>>3));
            return h32 ^ (h32 >> 16);
		}
	}
	return new SimplexNoise(seed);
}


////////////////////////////////////////////////////////////////
// Poisson-Disc utility code. Created by Reinder Nijhoff 2019
// https://turtletoy.net/turtle/b5510898dc
////////////////////////////////////////////////////////////////
function PoissonDiscGrid(radius) {
    class PoissonDiscGrid {
        constructor(radius) {
            this.cellSize = 1/Math.sqrt(2)/radius;
            this.radius2 = radius*radius;
            this.cells = [];
        }
        insert(p) {
            const x = p[0]*this.cellSize|0, y=p[1]*this.cellSize|0;
            for (let xi = x-1; xi<=x+1; xi++) {
                for (let yi = y-1; yi<=y+1; yi++) {
                    const ps = this.cell(xi,yi);
                    for (let i=0; i<ps.length; i++) {
                        if ((ps[i][0]-p[0])**2 + (ps[i][1]-p[1])**2 < this.radius2) {
                            return false;
                        }
                    }
                }       
            }
            this.cell(x, y).push(p);
            return true;
        }
        cell(x,y) {
            const c = this.cells;
            return (c[x]?c[x]:c[x]=[])[y]?c[x][y]:c[x][y]=[];
        }
    }
    return new PoissonDiscGrid(radius);
}


////////////////////////////////////////////////////////////////
// Tortoise utility code. Created by Reinder Nijhoff 2019
// https://turtletoy.net/turtle/102cbd7c4d
////////////////////////////////////////////////////////////////

function Tortoise(x, y) {
    class Tortoise extends Turtle {
        constructor(x, y) {
            super(x, y);
            this.ps = Array.isArray(x) ? [...x] : [x || 0, y || 0];
            this.transforms = [];
        }
        addTransform(t) {
            this.transforms.push(t);
            this.jump(this.ps);
            return this;
        }
        applyTransforms(p) {
            if (!this.transforms) return p;
            let pt = [...p];
            this.transforms.map(t => { pt = t(pt); });
            return pt;
        }
        goto(x, y) {
            const p = Array.isArray(x) ? [...x] : [x, y];
            const pt = this.applyTransforms(p);
            if (this.isdown() && (this.pt[0]-pt[0])**2 + (this.pt[1]-pt[1])**2 > 4) {
               this.goto((this.ps[0]+p[0])/2, (this.ps[1]+p[1])/2);
               this.goto(p);
            } else {
                super.goto(pt);
                this.ps = p;
                this.pt = pt;
            }
        }
        position() { return this.ps; }
    }
    return new Tortoise(x,y);
}

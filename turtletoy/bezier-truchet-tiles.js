// Bezier Truchet tiles. Created by Reinder Nijhoff 2019 - @reindernijhoff
//
// https://turtletoy.net/turtle/f107e05a76
//

const turtle = new Turtle();

const scale = 12;
const type = 1; // min=0, max=3, step=1
const lineWidth = .4; // min=0.1, max=0.4, step=0.01
const curviness = .95; // min=0.0, max=1.0, step=0.01
const innerLines = 2; // min=0, max=9, step=1

const generateTile = generateTileFactory(type);

function drawTile(t, tile) {
    if (Math.abs(scale*tile.center[0]) > 100+scale ||
        Math.abs(scale*tile.center[1]) > 100+scale) return; // early discard
    
    const polys  = new Polygons();
    const lw = lineWidth * tile.lineWidth;
    // transform
    const ts  = p => [scale*(p[0]+tile.center[0]),scale*(p[1]+tile.center[1])];
    // vec2 helper functions
    const add = (a, b) => [a[0]+b[0]+0, a[1]+b[1]];
    const sub = (a, b) => [a[0]-b[0], a[1]-b[1]];
    const scl = (a, b) => [a[0]*b, a[1]*b];
    const dst = (a, b) => Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2);
    const bez = (p0, p1, p2, p3, t) => {
        const k = 1 - t;
        return [    k*k*k*p0[0] + 3*k*k*t*p1[0] + 3*k*t*t*p2[0] + t*t*t*p3[0],
                    k*k*k*p0[1] + 3*k*k*t*p1[1] + 3*k*t*t*p2[1] + t*t*t*p3[1] ];
    }
    // helper function: add a bezier curve to a polygon p.
    const addBezier = (p, p0, d0, p1, d1, dist, asEdge, asLine) => {
        const sp = sub(p0, scl([d0[1],-d0[0]], dist)),
              ep = add(p1, scl([d1[1],-d1[0]], dist)),
              curve = curviness*(dst(sp,ep)**(2/3))*tile.lineWidth,
              sc = add(sp, scl(d0,curve)), ec = add(ep, scl(d1,curve));
              
        const points = [];
        for (let i=0, steps=10; i<=steps; i++) {
           points.push(ts(bez(sp, sc, ec, ep, i/steps)));
        }
        if (asEdge) p.addPoints(...points);
        if (asLine) {
            for (let i=0, steps=10; i<steps; i++) p.addSegments(points[i],points[i+1]);
        }
    }
    // shuffle points of tile -> this gives the random connections
    const p = tile.points.sort(() => Math.random()-.5);
    
    // create and draw a bezier-based polygon for each connection
    for (let i=0; i<p.length; i+=2) {
        const s = p[i+0], e = p[i+1], l = polys.create();
        addBezier(l, s[0], s[1], e[0], e[1], lw, true, true);        
        addBezier(l, e[0], e[1], s[0], s[1], lw, true, true);
        for (let j=0; j<innerLines; j++) {
            addBezier(l, e[0], e[1], s[0], s[1], 2*lw*(j+1)/(innerLines+1)-lw, false, true);   
        }
        polys.draw(t, l);
    }
}

function walk(i) {
    const s = (200/scale|0)+2;
    const y = Math.floor(i/(s*2))-s, x = (i % (s*2)) - s;
    
    drawTile(turtle, generateTile(x,y));
    
    return i < s*s*4;
}

// A tile has a center and a set of points (positions + directions). The points will be used as
// start or end point of the bezier curves.
function generateTileFactory(t) {
    switch(t) {
        case 0: return (x,y) => { return { // quad
                    center: [x,y],
                    lineWidth: 1,
                    points: [[[0,.5],[0,-1]], [[0,-.5],[0,1]], [[.5,0],[-1,0]],[[-.5,0],[1,0]]]
                }};
        case 1: return (x,y) => { return { // double quad
                    center: [x,y],
                    lineWidth: .5,
                    points: [[[.25,.5],[0,-1]], [[.25,-.5],[0,1]], [[.5,.25],[-1,0]],[[-.5,.25],[1,0]],
                             [[-.25,.5],[0,-1]], [[-.25,-.5],[0,1]], [[.5,-.25],[-1,0]],[[-.5,-.25],[1,0]]]
                }};
        case 2: return (x,y) => { // double triangle
                    const h = Math.sqrt(3)/4;
                    let points = [[[-.25,-h],[0,1]],[[.25,-h],[0,1]],
                        [[-1/3,-h/3],[2*h,-.5]],[[-1/6,h/3],[2*h,-.5]],
                        [[1/3,-h/3],[-2*h,-.5]],[[1/6,h/3],[-2*h,-.5]]];
                    if (x % 2 != 0) points = points.map(p => [[p[0][0],-p[0][1]],[p[1][0],-p[1][1]]]);
                    return { 
                        center: [x*.5, y*h*2],
                        lineWidth: .35,
                        points
                }};
        case 3: return (x,y) => { // hexagon
                    const h = Math.sqrt(3)/4;
                    let points = [[[0,-h],[0,1]],[[0,h],[0,-1]],
                        [[-h/2-1/4,-h/2],[2*h,.5]],[[-h/2-1/4,h/2],[2*h,-.5]],
                        [[h/2+1/4,-h/2],[-2*h,.5]],[[h/2+1/4,h/2],[-2*h,-.5]]];
                    return { 
                        center: [x*(.5+h), y*2*h + ((x % 2 != 0) ? 0:h)],
                        lineWidth: .6,
                        points
                }};
                
    }
}

////////////////////////////////////////////////////////////////
// reinder's occlusion code parts from "Cubic space division #2"
// Optimizations and code clean-up by ge1doot
////////////////////////////////////////////////////////////////

function Polygons() {
	const polygonList = [];
	const linesDrawn = [];
	const Polygon = class {
		constructor() {
			this.cp = [];       // clip path: array of [x,y] pairs
			this.dp = [];       // 2d line to draw
			this.aabb = [];     // AABB bounding box
		}
		addPoints(...points) {
		    points.forEach(p => this.cp.push(p));
		    this.aabb = this.AABB();
		}
		addSegments(...points) {
		    points.forEach(p => this.dp.push(p));
		}
		addOutline(s = 0) {
			for (let i = s, l = this.cp.length; i < l; i++) {
				this.dp.push(this.cp[i], this.cp[(i + 1) % l]);
			}
		}
		draw(t) {
			if (this.dp.length === 0) return;
			for (let i = 0, l = this.dp.length; i < l; i+=2) {
				const d0 = this.dp[i], d1 = this.dp[i + 1];
				const line_hash = 'h' +
					Math.min(d0[0], d1[0]).toFixed(2) +
					Math.max(d0[0], d1[0]).toFixed(2) +
					Math.min(d0[1], d1[1]).toFixed(2) +
					Math.max(d0[1], d1[1]).toFixed(2);

				if (!linesDrawn[line_hash]) {
					t.jump(d0);
					t.goto(d1);
					linesDrawn[line_hash] = true;
				}
			}
		}
		AABB() {
			let xmin = 1e5, xmax = -1e5, ymin = 1e5, ymax = -1e5;
			this.cp.forEach( p => {
				const x = p[0];
				const y = p[1];
				if (x < xmin) xmin = x;
				if (x > xmax) xmax = x;
				if (y < ymin) ymin = y;
				if (y > ymax) ymax = y;
			});
			// Bounding box: center x, center y, half w, half h
			return [(xmin + xmax)*.5, (ymin + ymax)*.5, (xmax - xmin)*.5, (ymax - ymin)*.5];
		}
		addHatching(a, d) {
			const tp = new Polygon();
			tp.cp.push(
			    [this.aabb[0] - this.aabb[2], this.aabb[1] - this.aabb[3]],
			    [this.aabb[0] + this.aabb[2], this.aabb[1] - this.aabb[3]],
			    [this.aabb[0] + this.aabb[2], this.aabb[1] + this.aabb[3]],
			    [this.aabb[0] - this.aabb[2], this.aabb[1] + this.aabb[3]]
			);
			const dx = Math.sin(a) * d, dy = Math.cos(a) * d;
			const cx = Math.sin(a) * 200, cy = Math.cos(a) * 200;
			for (let i = 0.5; i < 150 / d; i++) {
				tp.dp.push([dx * i + cy, dy * i - cx],   [dx * i - cy, dy * i + cx]);
				tp.dp.push([-dx * i + cy, -dy * i - cx], [-dx * i - cy, -dy * i + cx]);
			}
			tp.boolean(this, false);
			tp.dp.forEach(dp => this.dp.push(dp));
		}
		inside(p) {
			// find number of i ntersection points from p to far away
			// if even your outside
			const p1 = [0.1, -1000];
			let int = 0;
			for (let i = 0, l = this.cp.length; i < l; i++) {
				if (this.vec2_find_segment_intersect(p, p1, this.cp[i], this.cp[(i + 1) % l]) !== false) {
					int++;
				}
			}
			return int & 1;
		}
		boolean(p, diff = true) {
			// polygon diff algorithm (narrow phase)
			const ndp = [];
			for (let i = 0, l = this.dp.length; i < l; i+=2) {
				const ls0 = this.dp[i];
				const ls1 = this.dp[i + 1];
				// find all intersections with clip path
				const int = [];
				for (let j = 0, cl = p.cp.length; j < cl; j++) {
					const pint = this.vec2_find_segment_intersect(ls0, ls1, p.cp[j], p.cp[(j + 1) % cl]);
					if (pint !== false) {
						int.push(pint);
					}
				}
				if (int.length === 0) {
					// 0 intersections, inside or outside?
					if (diff === !p.inside(ls0)) {
						ndp.push(ls0, ls1);
					}
				} else {
					int.push(ls0, ls1);
					// order intersection points on line ls.p1 to ls.p2
					const cmpx = ls1[0] - ls0[0];
					const cmpy = ls1[1] - ls0[1];
					for (let i = 0, len = int.length; i < len; i++) {
					    let j = i;
					    const item = int[j];
						for (const db = (item[0] - ls0[0]) * cmpx + (item[1] - ls0[1]) * cmpy;
							 j > 0 && (int[j - 1][0] - ls0[0]) * cmpx + (int[j - 1][1] - ls0[1]) * cmpy < db;
							 j--) {
						    int[j] = int[j - 1];
						}
						int[j] = item;
					}
					for (let j = 0; j < int.length - 1; j++) {
						if ((int[j][0] - int[j + 1][0]) ** 2 + (int[j][1] - int[j + 1][1]) ** 2 >= 0.01) {
							if (diff === !p.inside([
									(int[j][0] + int[j + 1][0]) / 2,
									(int[j][1] + int[j + 1][1]) / 2
								])) {
								ndp.push(int[j], int[j + 1]);
							}
						}
					}
				}
			}
			this.dp = ndp;
			return this.dp.length > 0;
		}
		//port of http://paulbourke.net/geometry/pointlineplane/Helpers.cs
		vec2_find_segment_intersect(l1p1, l1p2, l2p1, l2p2) {
			const d =
				(l2p2[1] - l2p1[1]) * (l1p2[0] - l1p1[0]) -
				(l2p2[0] - l2p1[0]) * (l1p2[1] - l1p1[1]);
			if (d === 0) return false;
			const n_a =
				(l2p2[0] - l2p1[0]) * (l1p1[1] - l2p1[1]) -
				(l2p2[1] - l2p1[1]) * (l1p1[0] - l2p1[0]);
			const n_b =
				(l1p2[0] - l1p1[0]) * (l1p1[1] - l2p1[1]) -
				(l1p2[1] - l1p1[1]) * (l1p1[0] - l2p1[0]);
			const ua = n_a / d;
			const ub = n_b / d;
			if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
				return [
					l1p1[0] + ua * (l1p2[0] - l1p1[0]),
					l1p1[1] + ua * (l1p2[1] - l1p1[1])
				];
			}
			return false;
		}
	};
	return {
		list() {
			return polygonList;
		},
		create() {
			return new Polygon();
		},
		draw(turtle, p, addToVisList=true) {
			let vis = true;
			for (let j = 0; j < polygonList.length; j++) {
				const p1 = polygonList[j];
				// AABB overlapping test - still O(N2) but very fast
				if (Math.abs(p1.aabb[0] - p.aabb[0]) - (p.aabb[2] + p1.aabb[2]) <= 0 &&
					Math.abs(p1.aabb[1] - p.aabb[1]) - (p.aabb[3] + p1.aabb[3]) <= 0) {
					if (p.boolean(p1) === false) {
						vis = false;
						break;
					}
				}
			}
			if (vis) {
				p.draw(turtle);
				if (addToVisList) polygonList.push(p);
			}
		}
	};
}


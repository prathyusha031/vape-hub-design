"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

/**
 * Physical-looking exhaled vapor, rendered in one WebGL pass.
 *  - A decelerating jet from a point (the mouth), spreading into a cone,
 *    breaking into turbulence downstream, rising slowly and dissipating.
 *  - Monochrome, translucent; brighter only where it passes the backlight
 *    (backlit vapor), never coloured.
 *  - Optional faint room haze, lingering wisps, and a "drift" band used by the
 *    scroll transition to carry the eye across the frame.
 * All values are driven externally (the film director) via `set()`.
 */

export type ExhaleParams = {
  /** px, relative to the canvas box */
  origin: [number, number];
  /** unit vector of the exhale direction (screen space, +y down) */
  dir: [number, number];
  /** seconds since the exhale began; <0 hides the plume */
  age: number;
  intensity: number;
  /** px, relative to the canvas box — position of the backlight */
  light: [number, number];
  haze: number;
  wisp: number;
  drift: number;
};

export type ExhaleHandle = { set: (p: Partial<ExhaleParams>) => void };

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime, uAge, uIntensity, uHaze, uWisp, uDrift, uAspect, uDay;
uniform vec2 uOrigin, uDir, uLight;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),f.x), mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x), f.y); }
float fbm(vec2 p){ float v=0., a=.5; mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ v+=a*n(p); p=m*p; a*=.5; } return v; }

float plume(vec2 p, float age){
  if (age <= 0.0) return 0.0;
  vec2 q = p - uOrigin;
  q.y -= 0.042*age*age;                       // warm vapor rises dynamically
  float s = dot(q, uDir);
  float r = dot(q, vec2(-uDir.y, uDir.x));
  float L = 1.35*(1.0 - exp(-age/0.95));      // much longer jet front reaching across frame
  
  // Multi-frequency turbulent swirling eddies
  vec2 w1 = vec2(fbm(p*2.6 + vec2(uTime*0.22, -uTime*0.09)),
                 fbm(p*2.6 + vec2(5.2, 1.3) + uTime*0.14)) - 0.5;
  vec2 w2 = vec2(fbm(p*5.4 - vec2(uTime*0.12, uTime*0.18)),
                 fbm(p*5.4 + vec2(2.1, 7.8) - uTime*0.08)) - 0.5;
  vec2 w = w1 * 0.75 + w2 * 0.45;
  
  float turb = 0.08 + 0.48*clamp(s/0.7, 0.0, 1.0) + 0.09*age;
  s += w.x*turb; r += w.y*turb*1.6;
  
  // Much wider, richer volumetric cloud spread
  float width = 0.045 + max(s, 0.0)*0.78 + age*0.065;
  float along = smoothstep(-0.02, 0.04, s) * smoothstep(L + 0.15, L - 0.28, s);
  float core = exp(-(r*r)/(width*width));
  float tail = age > 1.2 ? smoothstep(0.0, 0.22, s - (age - 1.2)*0.16) : 1.0;
  
  // Fine cloud billow details
  float detail1 = smoothstep(0.22, 0.96, fbm(vec2(s*4.5 - uTime*0.3, r*7.0) + w*2.8));
  float detail2 = smoothstep(0.18, 0.92, fbm(vec2(s*9.0 + uTime*0.15, r*12.0) - w*1.5));
  float d = along*core*tail*(0.35 + 0.75*detail1 + 0.3*detail2);
  
  // Extended lingering smoke dissipation
  d *= exp(-max(age - 2.8, 0.0)/1.8) * smoothstep(0.0, 0.14, age);
  d *= mix(1.1, 0.7, clamp(s/max(L, 0.01), 0.0, 1.0));
  return d * 2.35; // Boosted density
}

void main(){
  vec2 p = gl_FragCoord.xy / uRes.y;
  float t = uTime;
  // Natural sunlit backlighting & forward scattering
  float lit = 0.35 + 0.85*exp(-length(p - uLight)/0.45);

  float d = plume(p, uAge) * uIntensity;

  // Rich atmospheric room haze
  float hz = uHaze * 0.16 * smoothstep(0.18, 0.88, fbm(p*1.2 + vec2(t*0.018, -t*0.012))) * (0.4 + lit);

  // Lingering swirling wisps
  float ws = uWisp * 0.35 * smoothstep(0.45, 0.9, fbm(p*1.8 + vec2(-t*0.045, t*0.02) + fbm(p*1.1 + t*0.03)))
             * smoothstep(0.02, 0.35, p.y) * smoothstep(1.0, 0.45, p.y);

  // Transition drift band
  float cx = mix(-0.6, uAspect + 0.6, uDrift);
  float band = exp(-pow((p.x - cx)/0.55, 2.0)) * sin(3.14159*clamp(uDrift, 0.0, 1.0));
  float dr = band * 0.85 * smoothstep(0.25, 0.86, fbm(p*2.1 + vec2(uDrift*1.8, t*0.04)));

  float a = clamp(d*1.1 + hz + ws*(0.5 + lit) + dr, 0.0, 0.96);
  vec3 col = vec3(0.97, 0.95, 0.92) * clamp(lit + dr*0.7, 0.0, 1.6);
  float glow = clamp(lit*1.4 - 0.15, 0.0, 1.0);
  
  // Golden hour natural sunlight tint
  vec3 dayCol = mix(vec3(0.82, 0.80, 0.76), vec3(1.0, 0.97, 0.91), glow);
  dayCol = mix(dayCol, vec3(1.0, 0.99, 0.96), 0.45*smoothstep(0.24, 0.84, fbm(p*2.8 + t*0.035)));
  col = mix(col, dayCol, uDay);
  a = mix(a, clamp(a*1.75, 0.0, 0.94), uDay);
  gl_FragColor = vec4(col*a, a);
}`;

const DEFAULTS: ExhaleParams = {
  origin: [0, 0],
  dir: [-0.94, -0.34],
  age: -1,
  intensity: 1,
  light: [0, 0],
  haze: 0,
  wisp: 0,
  drift: 0,
};

export const ExhaleVapor = forwardRef<ExhaleHandle, { className?: string; resolution?: number; day?: boolean }>(function ExhaleVapor(
  { className, resolution = 0.6, day = false },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useRef<ExhaleParams>({ ...DEFAULTS });

  useImperativeHandle(ref, () => ({
    set: (p) => {
      params.current = { ...params.current, ...p };
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return;
    const sh = (t: number, s: string) => {
      const o = gl.createShader(t)!;
      gl.shaderSource(o, s);
      gl.compileShader(o);
      return o;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = {
      res: U("uRes"), time: U("uTime"), age: U("uAge"), inten: U("uIntensity"), haze: U("uHaze"),
      wisp: U("uWisp"), drift: U("uDrift"), aspect: U("uAspect"), origin: U("uOrigin"), dir: U("uDir"), light: U("uLight"), day: U("uDay"),
    };

    const mobile = window.matchMedia("(max-width: 899px)").matches;
    const scale = mobile ? resolution * 0.85 : resolution;
    let cssW = 1;
    let cssH = 1;
    const resize = () => {
      cssW = canvas.clientWidth || 1;
      cssH = canvas.clientHeight || 1;
      const w = Math.max(2, Math.floor(cssW * scale));
      const h = Math.max(2, Math.floor(cssH * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();
    const draw = (now: number) => {
      const p = params.current;
      const t = reduce ? 12 : (now - t0) / 1000;
      // css px (y down) → normalized by height (y up)
      const nx = (x: number) => x / cssH;
      const ny = (y: number) => (cssH - y) / cssH;
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform1f(u.time, t);
      gl.uniform1f(u.age, p.age);
      gl.uniform1f(u.inten, p.intensity);
      gl.uniform1f(u.haze, p.haze);
      gl.uniform1f(u.wisp, p.wisp);
      gl.uniform1f(u.drift, p.drift);
      gl.uniform1f(u.day, day ? 1 : 0);
      gl.uniform1f(u.aspect, cssW / cssH);
      gl.uniform2f(u.origin, nx(p.origin[0]), ny(p.origin[1]));
      const len = Math.hypot(p.dir[0], p.dir[1]) || 1;
      gl.uniform2f(u.dir, p.dir[0] / len, -p.dir[1] / len);
      gl.uniform2f(u.light, nx(p.light[0]), ny(p.light[1]));
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      draw(now);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [resolution, day]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
});

// ─────────────────────────────────────────────────────────────────────────────
// ShaderHero — custom raw-WebGL fragment-shader background for the hero:
// domain-warped FBM "molten threads" in safety amber over near-black charcoal,
// mouse-reactive, DPR-capped, paused off-screen. If WebGL is unavailable it
// degrades to an animated 2D-canvas gradient (never a dead static hero).
// Lazy-loaded from Hero.jsx so it ships in its own chunk.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / min(uRes.x, uRes.y);
  float t = uTime * 0.045;
  vec2 m = uMouse * 0.35;

  float warp = fbm(uv * 2.1 - vec2(t * 0.7, t) + m);
  float n = fbm(uv * 1.55 + vec2(t, -t * 0.6) + m * 1.4 + warp * 1.1);

  float threads = sin(uv.y * 13.0 + n * 8.5 + uv.x * 1.8 + t * 2.2);
  float line = smoothstep(0.15, 1.0, threads) * 0.5 + 0.5;

  vec3 charcoal = vec3(0.028, 0.028, 0.032);
  vec3 smoke = vec3(0.075, 0.07, 0.062);
  vec3 amber = vec3(1.0, 0.60, 0.045);
  vec3 amberHot = vec3(1.0, 0.78, 0.28);

  vec3 col = mix(charcoal, smoke, n);
  col = mix(col, amber, pow(line, 3.0) * smoothstep(0.35, 0.85, n) * 0.75);
  col += amberHot * pow(max(0.0, n - 0.62), 2.0) * 1.15;

  float vig = dot(uv * vec2(0.62, 0.85), uv * vec2(0.62, 0.85));
  col *= 1.0 - 0.5 * vig;
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function ShaderHero({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    let raf = 0;
    let running = true;
    let visible = true;
    let cleanup = () => {};

    const start2D = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let w = 0;
      let h = 0;
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));
      };
      resize();
      window.addEventListener('resize', resize);
      const draw = now => {
        if (!running) return;
        const t = now * 0.00006;
        const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        g.addColorStop(0, '#0a0a0c');
        g.addColorStop(0.55 + 0.2 * Math.sin(t * 2.0), '#171106');
        g.addColorStop(1, '#0a0a0c');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.16;
        ctx.strokeStyle = '#f5b301';
        ctx.lineWidth = Math.max(1, canvas.height * 0.002);
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          for (let x = 0; x <= canvas.width; x += 14) {
            const y =
              canvas.height * (0.25 + i * 0.13) +
              Math.sin(x * 0.004 + t * 6.0 + i * 1.7) * canvas.height * 0.05 +
              Math.sin(x * 0.0016 - t * 3.0 + i) * canvas.height * 0.03;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        if (!reduce) raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
      cleanup = () => window.removeEventListener('resize', resize);
    };

    let gl = null;
    try {
      gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    } catch {
      gl = null;
    }

    if (!gl) {
      start2D();
    } else {
      const compile = (type, src) => {
        const sh = gl.createShader(type);
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          gl.deleteShader(sh);
          return null;
        }
        return sh;
      };
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) {
        start2D();
      } else {
        const prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
          start2D();
        } else {
          gl.useProgram(prog);
          const buf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
          const loc = gl.getAttribLocation(prog, 'aPos');
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
          const uRes = gl.getUniformLocation(prog, 'uRes');
          const uTime = gl.getUniformLocation(prog, 'uTime');
          const uMouse = gl.getUniformLocation(prog, 'uMouse');

          const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
          const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
            const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
            if (canvas.width !== w || canvas.height !== h) {
              canvas.width = w;
              canvas.height = h;
              gl.viewport(0, 0, w, h);
            }
          };
          const onMove = e => {
            mouse.tx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
            mouse.ty = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
          };
          resize();
          window.addEventListener('resize', resize);
          window.addEventListener('pointermove', onMove, { passive: true });

          const t0 = performance.now();
          const draw = now => {
            if (!running) return;
            if (visible) {
              mouse.x += (mouse.tx - mouse.x) * 0.04;
              mouse.y += (mouse.ty - mouse.y) * 0.04;
              gl.uniform2f(uRes, canvas.width, canvas.height);
              gl.uniform1f(uTime, reduce ? 24.0 : (now - t0) / 1000);
              gl.uniform2f(uMouse, mouse.x, mouse.y);
              gl.drawArrays(gl.TRIANGLES, 0, 3);
            }
            if (!reduce) raf = requestAnimationFrame(draw);
          };
          raf = requestAnimationFrame(draw);
          cleanup = () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onMove);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
          };
        }
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className={`shader-hero ${className}`} aria-hidden="true" />;
}

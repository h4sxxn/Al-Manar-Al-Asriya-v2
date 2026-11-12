import{n as e,r as t,t as n}from"./index-BZqoHdWl.js";var r=t(e(),1),i=n(),a=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`,o=`
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
`;function s({className:e=``}){let t=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=t.current;if(!e)return;let n=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1,r=0,i=!0,s=!0,c=()=>{},l=()=>{let t=e.getContext(`2d`);if(!t)return;let a=0,o=0,s=()=>{let t=Math.min(window.devicePixelRatio||1,1.25);a=e.clientWidth,o=e.clientHeight,e.width=Math.max(1,Math.floor(a*t)),e.height=Math.max(1,Math.floor(o*t))};s(),window.addEventListener(`resize`,s);let l=a=>{if(!i)return;let o=a*6e-5,s=t.createLinearGradient(0,0,e.width,e.height);s.addColorStop(0,`#0a0a0c`),s.addColorStop(.55+.2*Math.sin(o*2),`#171106`),s.addColorStop(1,`#0a0a0c`),t.fillStyle=s,t.fillRect(0,0,e.width,e.height),t.globalAlpha=.16,t.strokeStyle=`#f5b301`,t.lineWidth=Math.max(1,e.height*.002);for(let n=0;n<5;n++){t.beginPath();for(let r=0;r<=e.width;r+=14){let i=e.height*(.25+n*.13)+Math.sin(r*.004+o*6+n*1.7)*e.height*.05+Math.sin(r*.0016-o*3+n)*e.height*.03;r===0?t.moveTo(r,i):t.lineTo(r,i)}t.stroke()}t.globalAlpha=1,n||(r=requestAnimationFrame(l))};r=requestAnimationFrame(l),c=()=>window.removeEventListener(`resize`,s)},u=null;try{u=e.getContext(`webgl`,{antialias:!1,alpha:!1,powerPreference:`low-power`})}catch{u=null}if(!u)l();else{let t=(e,t)=>{let n=u.createShader(e);return u.shaderSource(n,t),u.compileShader(n),u.getShaderParameter(n,u.COMPILE_STATUS)?n:(u.deleteShader(n),null)},d=t(u.VERTEX_SHADER,a),f=t(u.FRAGMENT_SHADER,o);if(!d||!f)l();else{let t=u.createProgram();if(u.attachShader(t,d),u.attachShader(t,f),u.linkProgram(t),!u.getProgramParameter(t,u.LINK_STATUS))l();else{u.useProgram(t);let a=u.createBuffer();u.bindBuffer(u.ARRAY_BUFFER,a),u.bufferData(u.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),u.STATIC_DRAW);let o=u.getAttribLocation(t,`aPos`);u.enableVertexAttribArray(o),u.vertexAttribPointer(o,2,u.FLOAT,!1,0,0);let l=u.getUniformLocation(t,`uRes`),d=u.getUniformLocation(t,`uTime`),f=u.getUniformLocation(t,`uMouse`),p={x:0,y:0,tx:0,ty:0},m=()=>{let t=Math.min(window.devicePixelRatio||1,1.5),n=Math.max(1,Math.floor(e.clientWidth*t)),r=Math.max(1,Math.floor(e.clientHeight*t));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,u.viewport(0,0,n,r))},h=e=>{p.tx=e.clientX/Math.max(1,window.innerWidth)*2-1,p.ty=-(e.clientY/Math.max(1,window.innerHeight)*2-1)};m(),window.addEventListener(`resize`,m),window.addEventListener(`pointermove`,h,{passive:!0});let g=performance.now(),_=t=>{i&&(s&&(p.x+=(p.tx-p.x)*.04,p.y+=(p.ty-p.y)*.04,u.uniform2f(l,e.width,e.height),u.uniform1f(d,n?24:(t-g)/1e3),u.uniform2f(f,p.x,p.y),u.drawArrays(u.TRIANGLES,0,3)),n||(r=requestAnimationFrame(_)))};r=requestAnimationFrame(_),c=()=>{window.removeEventListener(`resize`,m),window.removeEventListener(`pointermove`,h),u.getExtension(`WEBGL_lose_context`)?.loseContext()}}}}let d=new IntersectionObserver(([e])=>{s=e.isIntersecting},{threshold:.02});return d.observe(e),()=>{i=!1,cancelAnimationFrame(r),d.disconnect(),c()}},[]),(0,i.jsx)(`canvas`,{ref:t,className:`shader-hero ${e}`,"aria-hidden":`true`})}export{s as default};
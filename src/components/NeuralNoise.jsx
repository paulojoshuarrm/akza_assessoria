import { useEffect, useRef } from "react";

/**
 * NeuralNoise — fullscreen WebGL fragment shader that paints an animated
 * fractal "neural" pattern with a soft pointer-driven distortion. Adapted from
 * the original snippet, hardened for React 18 (RAF cleanup, listener cleanup,
 * graceful no-WebGL fallback) and re-tinted for Akza's sage palette.
 */
export default function NeuralNoise({
  color = [0.50, 0.78, 0.66], // Akza mint ≈ rgb(127,199,168) normalised
  opacity = 0.45,
  speed = 0.0006,
  zIndex = 0,
  blur = 0,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl =
      canvasEl.getContext("webgl", { alpha: true, premultipliedAlpha: false }) ||
      canvasEl.getContext("experimental-webgl");
    if (!gl) {
      console.warn("NeuralNoise: WebGL not available — skipping shader.");
      return;
    }

    /* ── Shader sources ─────────────────────────────────────────── */
    const vsSource = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;
      void main() {
        vUv = 0.5 * (a_position + 1.0);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2  u_pointer_position;
      uniform vec3  u_color;
      uniform float u_speed;

      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.0);
        vec2 res = vec2(0.0);
        float scale = 8.0;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.0);
          sine_acc = rotate(sine_acc, 1.0);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (0.5 + 0.5 * cos(layer)) / scale;
          scale *= 1.2;
        }
        return res.x + res.y;
      }

      void main() {
        vec2 uv = 0.5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0.0, 1.0);
        p = 0.5 * pow(1.0 - p, 2.0);
        float t = u_speed * u_time;
        float noise = neuro_shape(uv, t, p);
        noise = 1.2 * pow(noise, 3.0);
        noise += pow(noise, 10.0);
        noise = max(0.0, noise - 0.5);
        noise *= (1.0 - length(vUv - 0.5));
        vec3 col = u_color * noise;
        gl_FragColor = vec4(col, noise);
      }
    `;

    function compileShader(src, type) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("NeuralNoise shader error:", gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("NeuralNoise link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    /* ── Uniforms ───────────────────────────────────────────────── */
    const uniforms = {};
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const name = gl.getActiveUniform(program, i).name;
      uniforms[name] = gl.getUniformLocation(program, name);
    }

    /* ── Geometry: a single quad ────────────────────────────────── */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.uniform3f(uniforms.u_color, color[0], color[1], color[2]);
    gl.uniform1f(uniforms.u_speed, speed);

    /* ── Pointer + RAF loop ─────────────────────────────────────── */
    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tX: window.innerWidth / 2,
      tY: window.innerHeight / 2,
    };
    let raf = 0;
    let alive = true;

    const onMove = (e) => {
      pointer.tX = e.clientX;
      pointer.tY = e.clientY;
    };
    const onTouch = (e) => {
      const t = e.targetTouches?.[0];
      if (t) {
        pointer.tX = t.clientX;
        pointer.tY = t.clientY;
      }
    };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = window.innerWidth * dpr;
      canvasEl.height = window.innerHeight * dpr;
      if (uniforms.u_ratio) {
        gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
      }
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
    }

    function tick() {
      if (!alive) return;
      pointer.x += (pointer.tX - pointer.x) * 0.18;
      pointer.y += (pointer.tY - pointer.y) * 0.18;
      gl.uniform1f(uniforms.u_time, performance.now());
      gl.uniform2f(
        uniforms.u_pointer_position,
        pointer.x / window.innerWidth,
        1 - pointer.y / window.innerHeight
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      // Drop GL resources eagerly so a re-mount gets a clean context
      try {
        gl.useProgram(null);
        gl.deleteBuffer(buf);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteProgram(program);
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
      } catch {}
    };
    // color/speed are arrays/numbers; stringify guards re-runs from new identical refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(color), speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
        zIndex,
        filter: blur ? `blur(${blur}px)` : undefined,
        mixBlendMode: "screen",
      }}
    />
  );
}

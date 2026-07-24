import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl';
import { isWebGLSupported } from '../utils/webgl';

const vertex = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
#ifdef GL_ES
precision lowp float;
#endif
varying vec2 vUv;
uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  gl_FragColor = vec4(clamp(col.rgb, 0.0, 1.0), pattern * pattern);
}
`;

type Props = {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
};

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
};

export default function Silk({
  speed = 5,
  scale = 1,
  color = '#7B7481',
  noiseIntensity = 1.5,
  rotation = 0
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (!isWebGLSupported()) {
      setWebglSupported(false);
      return;
    }

    const canvas = ref.current as HTMLCanvasElement;
    const parent = canvas.parentElement as HTMLElement;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas,
      alpha: true
    });

    const gl = renderer.gl;
    const geometry = new Triangle(gl);

    const rgb = hexToNormalizedRGB(color);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Vec3(rgb[0], rgb[1], rgb[2]) },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uRotation: { value: rotation },
        uNoiseIntensity: { value: noiseIntensity }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = parent.clientWidth || parent.offsetWidth || window.innerWidth;
      const h = parent.clientHeight || parent.offsetHeight || window.innerHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(parent);
    resize();

    const start = performance.now();
    let frame = 0;

    const loop = () => {
      program.uniforms.uTime.value = (performance.now() - start) / 1000;
      program.uniforms.uColor.value.set(hexToNormalizedRGB(color));
      program.uniforms.uSpeed.value = speed;
      program.uniforms.uScale.value = scale;
      program.uniforms.uRotation.value = rotation;
      program.uniforms.uNoiseIntensity.value = noiseIntensity;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  if (!webglSupported) {
    return (
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(180deg, ${color}22 0%, transparent 100%)`,
        }}
      />
    );
  }

  return <canvas ref={ref} className="w-full h-full block" />;
}

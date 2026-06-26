import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import React from "react";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Enhanced fbm with more sci-fi like patterns
float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 1.0;
    float freq = 1.0;
    // More octaves and altered frequency for digital/tech look
    for(int i = 0; i < 8; i++) {
        float noise = snoise(p * freq);
        // Add digital stepping effect to some layers
        if(i > 3) {
            noise = floor(noise * 5.0) / 5.0;
        }
        sum += amp * noise;
        amp *= 0.45;
        freq *= 2.2;
    }
    return sum;
}

// New futuristic pattern function - creates tech-like grid patterns
float gridPattern(vec2 uv, float scale, float intensity) {
    vec2 grid = fract(uv * scale);
    float lines = max(
        smoothstep(0.95, 1.0, grid.x) * intensity,
        smoothstep(0.95, 1.0, grid.y) * intensity
    );
    return lines;
}

// Energy pulse function for sci-fi effect
float energyPulse(vec2 uv, vec2 center, float radius, float thickness, float time) {
    float dist = length(uv - center);
    float pulse = sin(dist * 8.0 - time * 3.0) * 0.5 + 0.5;
    return smoothstep(radius - thickness, radius, dist) * 
           smoothstep(radius + thickness, radius, dist) * pulse;
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  // Create more dynamic flowing waves with time variance
  float timeOffset = sin(uTime * 0.1) * 0.2;
  
  // Primary wave with enhanced sci-fi patterns
  float primaryNoise = fbm(vec2(uv.x * 3.0 + uTime * 0.15, uTime * 0.2 + uv.y * 0.5)) * uAmplitude;
  
  // Secondary wave with higher frequency for tech details
  float secondaryNoise = fbm(vec2(uv.x * 5.5 - uTime * 0.1, uTime * 0.15 + uv.y * 2.0)) * uAmplitude * 0.4;
  
  // Data-stream effect - horizontal data lines
  float dataStream = fbm(vec2(uv.x * 20.0, uTime * 0.3)) * 0.15 * 
                    smoothstep(0.4, 0.6, fbm(vec2(uv.y * 2.0, uTime * 0.05)));
  
  // Grid overlay for tech effect
  float grid = gridPattern(uv + vec2(sin(uTime * 0.1), cos(uTime * 0.1)) * 0.1, 30.0, 0.15);
  
  // Energy pulse effects at random positions
  float pulse1 = energyPulse(uv, vec2(0.3 + sin(uTime * 0.2) * 0.1, 0.7), 0.1, 0.02, uTime);
  float pulse2 = energyPulse(uv, vec2(0.7 + cos(uTime * 0.15) * 0.1, 0.3), 0.15, 0.03, uTime * 0.8);
  float pulses = pulse1 + pulse2;
  
  // Combine all wave patterns with enhanced pulsing
  float pulseEffect = sin(uTime * 0.2) * 0.15 + 0.85;
  float combinedNoise = (primaryNoise + secondaryNoise + dataStream) * pulseEffect;
  
  // Apply exponential function with more dramatic effect
  float height = exp(combinedNoise * 0.9);
  
  // Calculate final intensity with more digital-looking transitions
  float intensity = 0.9 * smoothstep(0.05, 1.3, (uv.y * 2.0 - height + 0.3));
  
  // More dynamic blend point with tech-inspired fluctuations
  float midPoint = 0.25 + sin(uTime * 0.1) * 0.05 + cos(uTime * 0.2) * 0.03;
  float blendFactor = uBlend * (1.0 + sin(uTime * 0.15) * 0.2);
  float auroraAlpha = smoothstep(midPoint - blendFactor * 0.5, midPoint + blendFactor * 0.5, intensity);
  
  // Futuristic color shifting based on time
  vec3 timeShift = vec3(
    sin(uTime * 0.1) * 0.05,  // Less red shift
    cos(uTime * 0.15) * 0.08, // Moderate green shift
    sin(uTime * 0.2 + uv.x) * 0.15  // More blue shift for bluish tone
  );
  
  // Blue-dominant color enhancement
  vec3 blueBoost = vec3(0.0, 0.05, 0.15); // Subtle blue bias
  
  // Enhanced color output with more vibrance and blue dominance
  vec3 auroraColor = intensity * (rampColor + timeShift + blueBoost) * 1.3;
  
  // Add tech grid overlay
  auroraColor += grid * vec3(0.1, 0.2, 0.5) * intensity;
  
  // Add energy pulse highlights with blue tint
  auroraColor += pulses * vec3(0.0, 0.3, 0.8) * 2.0;
  
  // Add subtle edge glow with blue enhancement
  float edgeGlow = pow(1.0 - abs(uv.y - 0.5) * 2.0, 3.0) * 0.4;
  auroraColor += edgeGlow * (rampColor + vec3(0.0, 0.1, 0.3));
  
  // Add digital noise/static to certain areas for tech effect
  float digitalNoise = step(0.97, fract(sin(dot(floor(uv * 100.0), vec2(12.9898, 78.233))) * 43758.5453));
  auroraColor += digitalNoise * vec3(0.1, 0.3, 0.5) * intensity * 0.3;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

export default function Aurora(props) {
  const {
    // More blue-dominant color scheme
    colorStops = ["#0a2463", "#1e96fc", "#073b90"], // Deep blue, bright blue, royal blue
    amplitude = 1.5,
    blend = 0.7,
  } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const ctnDom = useRef(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";

    let program;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener("resize", resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t) => {
      animateId = requestAnimationFrame(update);
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;
      program.uniforms.uTime.value = time * speed * 0.18; // Slightly faster animation
      program.uniforms.uAmplitude.value =
        propsRef.current.amplitude ?? amplitude;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      const stops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = stops.map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [amplitude, blend, colorStops]); // Added proper dependencies

  return <div ref={ctnDom} className="w-full h-full" />;
}

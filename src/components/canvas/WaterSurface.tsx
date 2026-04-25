import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type WaterSurfaceProps = {
  speed?: number;
  opacity?: number;
};

const WaterSurface = ({ speed = 1, opacity = 1 }: WaterSurfaceProps) => {
  const MAX_RIPPLES = 10;
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const currentTimeRef = useRef(0);

  const rippleIndex = useRef(0);
  const lastWaveTime = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uSpeed: { value: speed },
      uMaxWaveTime: { value: 1.0 },
      uRippleCenters: {
        value: Array.from(
          { length: MAX_RIPPLES },
          () => new THREE.Vector2(999, 999),
        ),
      },
      uRippleTimes: { value: Array(MAX_RIPPLES).fill(-1000.0) },
    }),
    [opacity, speed],
  );

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const elapsedTime = currentTimeRef.current;
    if (elapsedTime - lastWaveTime.current > 0.1) {
      const point = event.point;
      const i = rippleIndex.current % MAX_RIPPLES;

      if (materialRef.current) {
        materialRef.current.uniforms.uRippleTimes.value[i] = elapsedTime;
        materialRef.current.uniforms.uRippleCenters.value[i].set(
          point.x,
          point.y,
        );

        lastWaveTime.current = elapsedTime;
        rippleIndex.current++;
      }
    }
  };

  useFrame((state) => {
    currentTimeRef.current = state.clock.elapsedTime;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

  const fragmentShader = `
  uniform float uOpacity;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uMaxWaveTime;
  const int MAX_RIPPLES = 10;
  uniform vec2 uRippleCenters[MAX_RIPPLES];
  uniform float uRippleTimes[MAX_RIPPLES];
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    float time = uTime * uSpeed;
    
    // Sky Color
    vec3 sky = vec3(0.0, 0.32, 0.53);

    // Upper Waves
    float waveMask = vUv.y;
    float bgWave = sin(vUv.x * 10.0 - time) * 0.2;
    bgWave += sin(vUv.x * 20.0 - time * 1.5) * 0.03;
    bgWave += sin(vUv.x * 5.0 + time * 0.8) * 0.05;
    bgWave *= waveMask;

    // Boundary
    float boundary = 0.97;
    float surfaceLine = boundary + bgWave * 0.05;
    float isSky = step(surfaceLine, vUv.y);
    float isWater = 1.0 - isSky;

    // Ripples
    float totalRipple = 0.0;
    for (int i = 0; i < MAX_RIPPLES; i++) {
      float t = uTime - uRippleTimes[i];

      if (t > 0.0 && t < uMaxWaveTime) {
        float dist = distance(vPos.xy, uRippleCenters[i]);

        float speed = 0.5;
        float R_prop = t * speed;
        float ringWidth = 0.03;

        float influence = smoothstep(R_prop + ringWidth, R_prop, dist)
                        * smoothstep(R_prop - ringWidth, R_prop - 0.03, dist);

        float fade = 1.0 - (t / (uMaxWaveTime + 0.00001));
        totalRipple += cos(dist * 5.0 - t * 2.0) * influence * fade * 0.1;
      }
    }

    // Final

    float ray1 = sin(vUv.x * 8.0 + uTime * 0.2) * 0.5 + 0.5;
    float rays = pow(ray1, 3.0);

    vec3 deep = vec3(0.0, 0.05, 0.1);
    vec3 surface = vec3(0.0, 0.48, 0.77);

    vec3 color = mix(deep, surface, (vUv.y + 0.2 + totalRipple * 0.5) * isWater);
    color = mix(color, sky, isSky);
    color += rays * 0.1;
    color += totalRipple * vec3(0.2, 0.6, 0.8);
    color += bgWave * 0.1;

    gl_FragColor = vec4(color, uOpacity);
  }
`;

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onClick={handlePointerMove}
      rotation={[-Math.PI * 0, 0, 0]}
    >
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export default WaterSurface;

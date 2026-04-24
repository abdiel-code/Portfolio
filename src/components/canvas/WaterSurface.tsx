import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type WaterSurfaceProps = {
  depth?: number;
  speed?: number;
  opacity?: number;
};

const WaterSurface = ({ depth, speed, opacity }: WaterSurfaceProps) => {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uSpeed: { value: speed },
    }),
    [],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform float uSpeed;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float time = uTime * uSpeed;
      float waveMask = vUv.y;
      
      float wave = sin(pos.x * 1.0 - time) * 0.2;
      wave += sin(pos.x * 2.0 - time * 1.5) * 0.03;
      wave += sin(pos.x * 0.5 + time * 0.8) * 0.05;
      
      pos.y += wave * waveMask;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uOpacity;
    uniform float uTime;
    varying vec2 vUv;    

    void main() {
      float ray1 = sin(vUv.x * 8.0 + uTime * 0.2) * 0.5 + 0.5;
      float ray2 = sin(vUv.x * 5.0 - uTime * 0.15) * 0.5 + 0.5;
      float rays = pow(ray1 * ray2, 3.0);
      float depthFade = exp(-vUv.y * 2.0);

      vec3 deep = vec3(0.0, 0.0, 0.0);
      vec3 surface = vec3(0.004, 0.486, 0.776);
      vec3 lightRay = vec3(0.561, 0.816, 0.867);
      vec3 color = mix(deep, surface, vUv.y+0.2);

      color += lightRay * rays * vUv.y * depthFade * 0.4;
      gl_FragColor = vec4(color, uOpacity);
    }
  `;

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width, viewport.height, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={true}
      />
    </mesh>
  );
};

export default WaterSurface;

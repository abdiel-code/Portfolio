import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Bubbles = () => {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const count = 50;

  const [positions, offsets] = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const offsetArr = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * viewport.width;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * viewport.height;
      posArr[i * 3 + 2] = 0;

      offsetArr[i] = Math.random() * 100.0;
    }
    return [posArr, offsetArr];
  }, [viewport]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHeight: { value: viewport.height },
    }),
    [viewport.height],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform float uHeight;
    attribute float aOffset;
    varying float vOpacity;

    void main() {
        vec3 pos = position;
        float speed = 0.5;

        float movedY = mod(uTime * speed + aOffset, uHeight) - (uHeight / 2.0);
        pos.y = movedY;
        pos.x += sin(uTime * 0.5 + aOffset) * 0.05;

        float limitY = (uHeight / 2.0) * 0.95;
        vOpacity = 1.0 - smoothstep(limitY - 1.0, limitY, pos.y);

       float randomFactor = fract(aOffset * 0.123);
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

        gl_PointSize = mix(8.0, 16.0, randomFactor);
        gl_Position = projectionMatrix * mvPosition;        
    }
  `;

  const fragmentShader = `
    varying float vOpacity;

    void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.45) discard;
        vec3 innerColor = vec3(0.0, 0.5, 0.7);
        vec3 edgeColor = vec3(0.0, 1.0, 1.0);

        float edgeMask = smoothstep(0.3, 0.45, dist);

        vec3 finalColor = mix(innerColor, edgeColor, edgeMask);
        finalColor += edgeMask * 0.4;
        float alphaEdge = smoothstep(0.45, 0.4, dist);

        gl_FragColor = vec4(finalColor, 0.6 * alphaEdge * vOpacity);
    }
  `;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          count={count}
          array={offsets}
          itemSize={1}
          args={[offsets, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </points>
  );
};

export default Bubbles;

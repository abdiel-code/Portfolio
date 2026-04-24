import { Canvas } from "@react-three/fiber";
import WaterSurface from "./WaterSurface";

/*
  Hex:
    Background: #01455E 
    Gradientes: { #015086 #017CA7 #000000 } 
    Light: #0192C6 
    Text-Others: #8FD0DD
  Tailwindcss:
    Background: bg-cyan-950
    Gradientes: { blue-900 sky-800 black } 
    Light: sky-600
    Text-Others: cyan-200
  Reference List:
  #000000 — the abyss, deepest point
  #01455E — deep ocean, mid depth
  #015086 / #017CA7 — getting shallower, more light
  #0192C6 — near surface, light filtering through
  #8FD0DD — surface light, text and accents

  */

const WaterCanvas = () => {
  return (
    <div className="fixed z-0 inset-0 bg-[#01455E]">
      <Canvas orthographic camera={{ position: [0, 0, 5], zoom: 100 }}>
        <WaterSurface depth={-0.5} speed={0.6} opacity={0.5} />
        <WaterSurface depth={0} speed={1.0} opacity={1.0} />
      </Canvas>
    </div>
  );
};

export default WaterCanvas;

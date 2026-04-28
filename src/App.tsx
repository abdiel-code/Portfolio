import { useState, useRef, useEffect } from "react";
import WaterCanvas from "./components/canvas/WaterCanvas";
import NavBar from "./components/Nav/NavBar";
import { motion } from "motion/react";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const navItems = ["Hero", "Projects", "Skills", "Contact"];
  const isAnimating = useRef(false);

  useEffect(() => {
    const handWheel = (e: WheelEvent) => {
      if (isAnimating.current) return;
      if (e.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, navItems.length - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      isAnimating.current = true;
      setTimeout(() => (isAnimating.current = false), 1000);
    };

    window.addEventListener("wheel", handWheel);
    return () => window.removeEventListener("wheel", handWheel);
  }, []);

  return (
    <>
      <WaterCanvas />
      <div className="relative h-screen overflow-hidden pointer-events-none">
        <NavBar onNavigate={setCurrentSection} />

        <motion.main
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: `-${currentSection * 100}vh` }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        >
          <Hero isActive={currentSection === 0} />
          <Projects isActive={currentSection === 1} />

          {/*Skills*/}
          {/*Contact*/}
        </motion.main>
      </div>
    </>
  );
}

export default App;

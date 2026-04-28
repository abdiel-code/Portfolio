import { useState, useRef, useEffect } from "react";
import WaterCanvas from "./components/canvas/WaterCanvas";
import NavBar from "./components/Nav/NavBar";
import { motion } from "motion/react";
import Hero from "./components/sections/Hero";

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
          className="relative z-10 h-screen overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: `-${currentSection * 100}vh` }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        >
          <Hero isActive={currentSection === 0} />
          <motion.section
            id="projects"
            animate={{
              y: currentSection === 1 ? 0 : 100,
              opacity: currentSection === 1 ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-screen w-full flex items-center justify-center text-white"
          >
            <div>Projects</div>
          </motion.section>
          {/*Skills*/}
          {/*Contact*/}
        </motion.main>
      </div>
    </>
  );
}

export default App;

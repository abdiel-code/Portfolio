import { useState, useRef, useEffect } from "react";
import WaterCanvas from "./components/canvas/WaterCanvas";
import NavBar from "./components/Nav/NavBar";
import { motion } from "motion/react";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const navItems = ["Hero", "Projects", "Skills", "Contact"];
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const projectsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const isProjectsScrollable = () => {
      const el = projectsRef.current;
      if (!el) return { atBottom: true, atTop: true };
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
      const atTop = el.scrollTop === 0;
      return { atBottom, atTop };
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const diff = touchStartY.current - e.changedTouches[0].clientY;

      const target = e.target as HTMLElement;
      if (target.closest("#projects")) {
        const { atBottom, atTop } = isProjectsScrollable();
        if (diff > 0 && !atBottom) return;
        if (diff < 0 && !atTop) return;
      }

      if (Math.abs(diff) < 50) return;

      if (diff > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, navItems.length - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      isAnimating.current = true;
      setTimeout(() => (isAnimating.current = false), 1000);
    };

    const handWheel = (e: WheelEvent) => {
      if (isAnimating.current) return;

      const target = e.target as HTMLElement;
      if (target.closest("#projects")) {
        const { atBottom, atTop } = isProjectsScrollable();
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      if (e.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, navItems.length - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      isAnimating.current = true;
      setTimeout(() => (isAnimating.current = false), 1000);
    };

    window.addEventListener("wheel", handWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("wheel", handWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
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
          <Projects isActive={currentSection === 1} sectionRef={projectsRef} />
          <Skills isActive={currentSection === 2} />
          <Contact isActive={currentSection === 3} />
        </motion.main>
      </div>
    </>
  );
}

export default App;

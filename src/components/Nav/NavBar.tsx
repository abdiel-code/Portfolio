import Nav from "./Nav";
import { useState } from "react";

type NavBarProps = {
  onNavigate: (index: number) => void;
};

const NavBar = ({ onNavigate }: NavBarProps) => {
  const navItems = ["Hero", "Projects", "Skills", "Contact"];
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center md:justify-center pointer-events-auto">
      <div className="hidden md:flex flex-wrap justify-center items-center gap-6 px-4">
        {navItems.map((item, index) => (
          <Nav
            key={index}
            title={item}
            delay={index}
            index={index}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {open && (
        <div className="flex flex-col items-end gap-3 absolute top-16 right-6">
          {navItems.map((item, index) => (
            <Nav
              key={index}
              title={item}
              delay={index}
              index={index}
              onNavigate={(i) => {
                onNavigate(i);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden absolute right-6 w-12 h-12 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 text-white flex items-center justify-center"
      >
        ☰
      </button>
    </nav>
  );
};

export default NavBar;

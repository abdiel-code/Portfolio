import Nav from "./Nav";

type NavBarProps = {
  onNavigate: (index: number) => void;
};

const NavBar = ({ onNavigate }: NavBarProps) => {
  const navItems = ["Hero", "Projects", "Skills", "Contact"];
  return (
    <nav className="fixed top-14 left-0 right-0 z-50 flex justify-center items-center gap-6">
      {navItems.map((item, index) => (
        <Nav
          title={item}
          key={index}
          delay={index}
          index={index}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
};

export default NavBar;

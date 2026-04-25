import { motion } from "motion/react";

type NavProps = {
  title: string;
  delay: number;
};

const Nav = ({ title, delay }: NavProps) => {
  return (
    <motion.a
      href={`#${title.toLowerCase()}`}
      animate={{ y: [0, -50, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 0.5,
      }}
      className="px-6 py-3 rounded-full border border-cyan-400/50 bg-cyan-500/10 backdrop-blur-sm text-white 
       text-sm font-medium hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
    >
      {title}
    </motion.a>
  );
};

export default Nav;

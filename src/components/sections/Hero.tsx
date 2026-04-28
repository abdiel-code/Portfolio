import { motion } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type HeroProps = {
  isActive: boolean;
};

const Hero = ({ isActive }: HeroProps) => {
  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-screen w-full flex items-center justify-center px-16"
    >
      <div className="flex items-center justify-between w-[65%] max-w-6xl">
        <motion.div
          className="flex flex-col gap-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{
            x: isActive ? 0 : -50,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
        >
          <h1 className="text-5xl font-bold text-white">
            Hi, I'm <span className="text-cyan-400">Abdiel Flores</span>
          </h1>
          <h2 className="text-2xl text-white/70">Full-Stack Developer</h2>
          <p className="text-white max-w-md">
            Building real-time web applications with Rust and Next.js. Open to
            remote opportunities
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/abdiel-code"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border border-cyan-400/50 bg-cyan-500/10 backdrop-blur-sm text-white/80 
                        text-sm font-medium hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
            >
              <FaGithub className="inline mr-2" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abdiel-jefté-flores-gutierrez-468208325"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border border-cyan-400/50 bg-cyan-500/10 backdrop-blur-sm text-white/80 
                        text-sm font-medium hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
            >
              <FaLinkedin className="inline mr-2" /> LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{
            x: isActive ? 0 : 100,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
        >
          <img
            src="/fox.png"
            alt="Foxcoon"
            className="w-64 h-64 object-contain"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;

import { motion } from "motion/react";
import type { Skill } from "../sections/Skills";

type SkillCardProps = {
  skill: Skill & { badge?: string };
};

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <motion.div
      className="group relative w-28 h-28 border border-4 border-white/10 backdrop-blur-sm bg-white/5 flex flex-col items-center 
      justify-center p-4 overflow-hidden pointer-events-auto cursor-pointer rounded-xl"
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-cyan-500/30"
        variants={{
          initial: { height: "0%" },
          hover: { height: "100%" },
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <motion.div
        variants={{
          initial: { y: 0 },
          hover: { y: -6 },
        }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-2"
      >
        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: skill.color + "33" }}
          >
            <span className="text-white font-bold text-sm font-mono">
              {skill.badge}
            </span>
          </div>
        )}
        <span className="text-xs font-medium text-white/50 group-hover:text-white transition-colors duration-500">
          {skill.name}
        </span>
      </motion.div>

      <motion.div
        className="absolute -bottom-1 left-0 w-[200%] h-4 bg-cyan-400/30 rounded-full"
        style={{ x: "-25%" }}
        variants={{
          initial: { y: 20, opacity: 0 },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default SkillCard;

import { motion } from "motion/react";
import SkillCard from "../skills/SkillCard";

export type Skill = {
  name: string;
  icon?: string;
  badge?: string;
  color: string;
};

const skills: Skill[] = [
  { name: "Rust", icon: "/icons/rust.svg", color: "#CE422B" },
  { name: "TypeScript", icon: "/icons/typescript.svg", color: "#3178C6" },
  { name: "Next.js", icon: "/icons/nextjs.svg", color: "#000000" },
  { name: "React", icon: "/icons/react.svg", color: "#61DAFB" },
  { name: "PostgreSQL", icon: "/icons/postgresql.svg", color: "#336791" },
  { name: "WebSockets", icon: "/icons/websockets.svg", color: "#010101" },
  { name: "Node.js", icon: "/icons/nodejs.svg", color: "#339933" },
  { name: "MongoDB", icon: "/icons/mongodb.svg", color: "#47A248" },
  { name: "Docker", icon: "/icons/docker.svg", color: "#2496ED" },
  { name: "Three.js", icon: "/icons/threejs.svg", color: "#000000" },
  { name: "Tauri", icon: "/icons/tauri.svg", color: "#FFC131" },
  { name: "GLSL", badge: "GLSL", color: "#5586A4" },
];

const Skills = ({ isActive }: { isActive: boolean }) => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center gap-12 px-16">
      <motion.h2
        className="text-4xl font-bold text-white/90"
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      >
        Tech Stack
      </motion.h2>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.05 }}
          >
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

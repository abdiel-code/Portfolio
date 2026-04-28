import type { Project } from "../sections/Projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "motion/react";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="flex items-center gap-12 w-full max-w-6xl group">
      <div className="flex items-center justify-between w-full gap-16">
        <motion.div
          className="relative border border-cyan-400/30 bg-cyan-500/5 backdrop-blur-md 
             shadow-xl shadow-cyan-900/20 overflow-hidden flex items-center justify-center"
          initial={{ borderRadius: "50%", width: "320px", height: "320px" }}
          animate={{
            y: [0, -8, -3, -10, 0],
            x: [0, 3, -2, 4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="object-cover drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            initial={{ width: "60%", height: "60%" }}
            whileHover={{ width: "100%", height: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="flex flex-col flex-1 gap-5">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <div className="h-1 w-20 bg-cyan-400 rounded-full" />
          </div>

          <p className="text-white/80 text-lg leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-400/20 rounded-md bg-cyan-400/5"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-2">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-500 text-slate-900 
                           text-sm font-bold hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20"
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 bg-white/5 
                           backdrop-blur-sm text-white text-sm font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                <FaGithub /> Code
              </a>
            )}

            {project.nda && (
              <span className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 text-white/40 text-sm italic">
                🔒 NDA — Production App
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

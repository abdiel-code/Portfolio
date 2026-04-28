import { motion } from "motion/react";
import ProjectCard from "../projects/ProjectCard";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  image: string;
  demo?: string;
  github?: string;
  nda?: boolean;
};

type ProjectProps = {
  isActive: boolean;
};

const projects: Project[] = [
  {
    title: "CRM Cluster",
    description:
      "Full-stack CRM with real-time dashboard, WebSocket broadcasts and per-user data isolation.",
    stack: ["Rust", "Axum", "Next.js", "PostgreSQL", "WebSockets"],
    image: "/crm-cluster.png",
    demo: "https://app.foxcoon.online",
    github: "https://github.com/abdiel-code/real-crm-cluster",
  },
  {
    title: "Ministerios Libertad",
    description:
      "Production platform for a church organization built on $0 infrastructure. Features real-time song/Bible streaming across devices, role-based access, YouTube processing pipeline, and a Tauri desktop app preferred by the client for daily use.",
    stack: ["React", "Node.js", "Socket.io", "Rust", "Tauri", "MongoDB", "JWT"],
    image: "/church.png",
    nda: true,
  },
];

const Projects = ({ isActive }: ProjectProps) => {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className="h-screen w-full flex items-center justify-center px-16 pointer-events-auto"
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-6xl">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;

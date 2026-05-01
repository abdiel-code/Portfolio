import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SocialLink from "../contact/SocialLink";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

type ContactProps = {
  isActive: boolean;
};

const Contact = ({ isActive }: ContactProps) => {
  const [copied, setCopied] = useState(false);
  const email = "abdieljflores.dev@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      id="contact"
      className="h-screen w-full flex flex-col items-center justify-center gap-8 px-6 text-center pointer-events-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="space-y-4">
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          Let's build <span className="text-cyan-400">something</span>
        </h2>
        <p className="text-cyan-100/60 text-lg max-w-md mx-auto italic">
          Available for remote opportunities and creative collaborations.
        </p>
      </div>

      <div className="relative group">
        <button
          onClick={handleCopy}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-cyan-400/30 bg-cyan-950/20 backdrop-blur-md text-cyan-50 font-mono text-sm md:text-base hover:border-cyan-400 transition-all duration-500"
        >
          {email}
          {copied ? (
            <FaCheck className="text-green-400" />
          ) : (
            <FaCopy className="text-cyan-400/50 group-hover:text-cyan-400" />
          )}
        </button>

        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -40 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex justify-center text-green-400 font-bold"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <SocialLink
          href="https://github.com/abdiel-code"
          icon={<FaGithub />}
          label="GitHub"
        />
        <SocialLink
          href="https://www.linkedin.com/in/abdiel-jefté-flores-gutierrez-468208325"
          icon={<FaLinkedin />}
          label="LinkedIn"
        />
        <SocialLink
          href={`mailto:${email}`}
          icon={<FaEnvelope />}
          label="Mail"
        />
      </div>

      <motion.div
        className="mt-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-help"
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 font-black">
              Created by
            </span>
            <img
              src="foxcoon.png"
              alt="foxcoon logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 font-black">
              Built with
            </span>
            <div className="flex gap-2">
              <img
                src="/icons/rust.svg"
                alt="rust logo"
                className="w-16 h-16 object-contain invert opacity-70"
              />
              <img
                src="/icons/nextjs.svg"
                alt="nextjs logo"
                className="w-16 h-16 object-contain invert opacity-70"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;

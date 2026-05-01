const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 
               text-sm font-medium hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
  >
    {icon} {label}
  </a>
);

export default SocialLink;

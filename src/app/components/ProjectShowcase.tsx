import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Neural Canvas',
    description: 'AI-powered design generation platform using stable diffusion',
    tech: ['React', 'Python', 'TensorFlow'],
    demo: '#',
    github: '#',
    cupColor: '#8B4513',
  },
  {
    id: 2,
    name: 'Quantum Tasks',
    description: 'Next-gen task management with predictive AI scheduling',
    tech: ['Next.js', 'TypeScript', 'OpenAI'],
    demo: '#',
    github: '#',
    cupColor: '#6F4E37',
  },
  {
    id: 3,
    name: 'Code Symphony',
    description: 'Turn your GitHub commits into beautiful music visualizations',
    tech: ['Vue.js', 'Web Audio API', 'D3.js'],
    demo: '#',
    github: '#',
    cupColor: '#A0522D',
  },
  {
    id: 4,
    name: 'Mindful Metrics',
    description: 'Mental health tracking app with mood analytics',
    tech: ['React Native', 'Firebase', 'Chart.js'],
    demo: '#',
    github: '#',
    cupColor: '#8B6F47',
  },
];

export function ProjectShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Brews from the Studio
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative h-[400px] group cursor-pointer"
              >
                {/* Coffee Cup (Default State) */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0 : 1,
                    scale: isHovered ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 blur-2xl opacity-30 rounded-full"
                    style={{ backgroundColor: project.cupColor }}
                  />

                  {/* Cup SVG */}
                  <svg viewBox="0 0 200 250" className="w-full h-full">
                    {/* Steam */}
                    <g opacity="0.3">
                      {[0, 1, 2].map((i) => (
                        <motion.path
                          key={i}
                          d={`M ${80 + i * 15} 30 Q ${85 + i * 15} 10 ${90 + i * 15} 0`}
                          fill="none"
                          stroke="#F5F1E8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                      ))}
                    </g>

                    {/* Cup Body */}
                    <path
                      d="M 70 80 L 60 200 L 140 200 L 130 80 Z"
                      fill={project.cupColor}
                      stroke="rgba(245, 241, 232, 0.3)"
                      strokeWidth="2"
                    />

                    {/* Coffee Top */}
                    <ellipse cx="100" cy="80" rx="30" ry="8" fill={project.cupColor} opacity="0.8" />

                    {/* Highlight */}
                    <ellipse cx="85" cy="120" rx="15" ry="30" fill="rgba(255, 255, 255, 0.1)" />

                    {/* Handle */}
                    <path
                      d="M 135 100 Q 160 130 135 160"
                      fill="none"
                      stroke="rgba(245, 241, 232, 0.3)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </svg>

                  <p className="mt-4 text-center text-[#F5F1E8]/80">{project.name}</p>
                </motion.div>

                {/* Project Card (Hover State) */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 p-6 bg-gradient-to-br from-[#C9A66B]/20 to-[#6F4E37]/20 border border-[#C9A66B] rounded-2xl backdrop-blur-lg flex flex-col"
                >
                  <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                    {project.name}
                  </h3>

                  <p className="text-sm text-[#F5F1E8]/80 mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs text-[#C9A66B]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.demo}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#C9A66B] text-[#0A0A0A] rounded-lg hover:bg-[#d4b47a] transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                    <a
                      href={project.github}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 border border-[#C9A66B] text-[#C9A66B] rounded-lg hover:bg-white/20 transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

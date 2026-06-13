import { motion } from 'motion/react';
import { Github, Linkedin, FileText } from 'lucide-react';

export function FinalScreen() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Fading Smoke Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1a1410]/30 to-[#0A0A0A]">
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 8 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1617531902521-88e0cce65fb6?w=1080"
            alt=""
            className="w-full h-full object-cover mix-blend-screen"
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 space-y-8"
        >
          <p
            className="text-3xl md:text-5xl leading-relaxed"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Every masterpiece began as an unfinished idea.
          </p>

          <p
            className="text-3xl md:text-5xl leading-relaxed"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Every creator started somewhere.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
            className="text-4xl md:text-6xl text-[#C9A66B] mt-12"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Keep brewing.
          </motion.p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-white/5 to-transparent border border-[#C9A66B]/30 rounded-full hover:border-[#C9A66B] transition-all duration-300 backdrop-blur-sm"
            onClick={(e) => e.preventDefault()}
          >
            <Github className="w-6 h-6 group-hover:text-[#C9A66B] transition-colors" />
            <span className="font-medium">GitHub</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-white/5 to-transparent border border-[#C9A66B]/30 rounded-full hover:border-[#C9A66B] transition-all duration-300 backdrop-blur-sm"
            onClick={(e) => e.preventDefault()}
          >
            <Linkedin className="w-6 h-6 group-hover:text-[#C9A66B] transition-colors" />
            <span className="font-medium">LinkedIn</span>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-[#C9A66B] text-[#0A0A0A] rounded-full hover:bg-[#d4b47a] transition-all duration-300"
            onClick={(e) => e.preventDefault()}
          >
            <FileText className="w-6 h-6" />
            <span className="font-medium">Resume</span>
          </a>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 text-[#C9A66B]/60 text-sm tracking-widest uppercase"
        >
          From Bean to Emotion
        </motion.p>

        {/* Decorative Coffee Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-12 mx-auto w-24 h-24"
        >
          <div className="w-full h-full rounded-full border-4 border-[#6F4E37]/30 relative">
            <div className="absolute inset-2 rounded-full border-2 border-[#6F4E37]/20" />
            <div className="absolute inset-4 rounded-full border border-[#6F4E37]/10" />
          </div>
        </motion.div>

        {/* Floating Particles (Subtle) */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#C9A66B] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </section>
  );
}

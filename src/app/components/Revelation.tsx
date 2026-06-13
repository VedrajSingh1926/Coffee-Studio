import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface RevelationProps {
  userData: {
    mood: string;
    blend: Record<string, number>;
    artScore: number;
  };
}

const archetypes = {
  builder: {
    name: 'The Builder',
    narrative: [
      'You are The Builder.',
      '',
      'You thrive on progress, momentum, and execution.',
      '',
      'Dreams inspire you,',
      'but results motivate you.',
    ],
    stats: { execution: 90, creativity: 60, vision: 70, consistency: 85 },
  },
  visionary: {
    name: 'The Visionary',
    narrative: [
      'You are The Visionary.',
      '',
      'You see possibilities where others see obstacles.',
      '',
      'The future excites you,',
      'and you paint it vividly for others.',
    ],
    stats: { execution: 60, creativity: 95, vision: 90, consistency: 55 },
  },
  architect: {
    name: 'The Architect',
    narrative: [
      'You are The Architect.',
      '',
      'You design systems, not just solutions.',
      '',
      'Precision matters,',
      'and structure sets you free.',
    ],
    stats: { execution: 80, creativity: 70, vision: 75, consistency: 95 },
  },
  explorer: {
    name: 'The Explorer',
    narrative: [
      'You are The Explorer.',
      '',
      'Curiosity guides your journey.',
      '',
      'Every question is an adventure,',
      'and every answer reveals new paths.',
    ],
    stats: { execution: 65, creativity: 85, vision: 80, consistency: 60 },
  },
};

export function Revelation({ userData }: RevelationProps) {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  const determineArchetype = () => {
    const { blend, artScore } = userData;
    const avgBlend = (blend.focus + blend.creativity + blend.consistency + blend.curiosity) / 4;

    if (blend.consistency > 70 && blend.focus > 65) return archetypes.architect;
    if (blend.creativity > 70 && artScore > 60) return archetypes.visionary;
    if (blend.curiosity > 70) return archetypes.explorer;
    return archetypes.builder;
  };

  const archetype = determineArchetype();

  useEffect(() => {
    if (currentLine < archetype.narrative.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => [...prev, archetype.narrative[currentLine]]);
        setCurrentLine((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentLine, archetype.narrative]);

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-32 px-6 relative overflow-hidden bg-transparent">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none z-0 mix-blend-multiply" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Center Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-primary rounded-full blur-[100px] opacity-20 animate-pulse-slow" />
            <div className="relative w-56 h-56 rounded-full border border-primary/30 bg-popover/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(17,11,8,0.6)] flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
              <div className="text-center relative z-10">
                <div className="text-6xl mb-4">☕</div>
                <p className="text-sm text-primary uppercase tracking-[0.4em] font-medium">Archetype</p>
              </div>
            </div>
          </div>

          <h2 className="text-6xl mb-10 text-center text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
            {archetype.name}
          </h2>
        </motion.div>

        {/* Typing Narrative */}
        <div className="mb-24 min-h-[350px] flex flex-col items-center justify-center">
          {displayedText.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`text-3xl md:text-4xl text-center mb-6 font-light leading-relaxed text-foreground/90 ${
                line === '' ? 'h-6' : ''
              }`}
              style={{ fontFamily: line === archetype.name ? 'var(--font-serif)' : 'inherit' }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {Object.entries(archetype.stats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.8 }}
              className="text-center p-8 bg-card/60 backdrop-blur-2xl border border-primary/10 rounded-[2rem] shadow-[0_20px_40px_rgba(17,11,8,0.5)] group hover:border-primary/30 transition-colors duration-700"
            >
              <div className="text-5xl text-primary mb-4 group-hover:scale-105 transition-transform duration-700" style={{ fontFamily: 'var(--font-serif)' }}>
                {value}%
              </div>
              <p className="text-sm uppercase tracking-[0.2em] font-medium text-foreground/60 group-hover:text-foreground/80 transition-colors duration-700">{key}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Statement */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 2, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-3xl md:text-4xl italic text-primary mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            "Coffee was never the destination.
          </p>
          <p className="text-3xl md:text-4xl italic text-primary" style={{ fontFamily: 'var(--font-serif)' }}>
            It was always the companion."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

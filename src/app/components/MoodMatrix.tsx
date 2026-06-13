import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Target, Cloud, Brain, ArrowRight } from 'lucide-react';

interface MoodMatrixProps {
  onSelect: (mood: string) => void;
}

const moods = [
  {
    id: 'IDEA',
    title: 'IDEA',
    description: 'The spark that starts everything.',
    response: 'You seek possibility before certainty.',
    icon: Lightbulb,
    color: '#D4AF37', // Gold
    effectType: 'glow'
  },
  {
    id: 'GOAL',
    title: 'GOAL',
    description: 'Focused execution with purpose.',
    response: 'Progress matters more than perfection.',
    icon: Target,
    color: '#6F4E37', // Warm Brown
    effectType: 'glow'
  },
  {
    id: 'DREAM',
    title: 'DREAM',
    description: 'Building beyond limitations.',
    response: 'You believe reality can be redesigned.',
    icon: Cloud,
    color: '#8B5A2B', // Dark Mocha variant
    effectType: 'glow'
  },
  {
    id: 'MEMORY',
    title: 'MEMORY',
    description: 'Learning from what came before.',
    response: 'Every lesson becomes part of your story.',
    icon: Brain,
    color: '#C9A66B', // Cream Highlight
    effectType: 'glow'
  },
];

export function MoodMatrix({ onSelect }: MoodMatrixProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect(id);
  };

  const selectedMood = moods.find(m => m.id === selected);

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-32 px-6 relative overflow-hidden transition-colors duration-1000">
      {/* Dynamic Background based on selection */}
      <AnimatePresence>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Elegant Cinematic Lighting instead of harsh particles */}
            <div className="absolute inset-0 opacity-15" style={{ backgroundColor: selectedMood.color }} />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.2 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[160px] mix-blend-screen"
              style={{ backgroundColor: selectedMood.color }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
            What is fueling your mind today?
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm uppercase tracking-[0.2em] font-medium mt-4"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Choose a mood below
          </motion.div>
        </motion.div>

        {/* Orbs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {moods.map((mood, index) => {
            const Icon = mood.icon;
            const isSelected = selected === mood.id;
            const isHovered = hoveredOrb === mood.id;
            const notSelected = selected && !isSelected;

            return (
              <motion.button
                key={mood.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredOrb(mood.id)}
                onMouseLeave={() => setHoveredOrb(null)}
                onClick={() => handleSelect(mood.id)}
                className={`relative group transition-all duration-500 ${notSelected ? 'opacity-40 grayscale blur-[2px] scale-90' : 'opacity-100'}`}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-full blur-3xl transition-all duration-500 ${
                    isSelected || isHovered ? 'opacity-60 scale-110' : 'opacity-0 scale-90'
                  }`}
                  style={{ backgroundColor: mood.color }}
                />

                {/* Orb Container */}
                <div className="relative aspect-square cursor-pointer group-hover:scale-[1.02] transition-transform duration-700">
                  <div
                    className={`absolute inset-0 rounded-full border backdrop-blur-2xl transition-all duration-1000 overflow-hidden shadow-2xl ${
                      isSelected ? 'bg-secondary/40 border-primary/60 shadow-[0_20px_50px_rgba(212,175,55,0.4)] ring-4 ring-primary/20 scale-95' : 'bg-card/60 border-primary/10 hover:border-primary/40 hover:bg-card/90 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)]'
                    }`}
                  >
                    {/* Hover inner gradient */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-700 ${isSelected ? 'opacity-30' : 'opacity-0 group-hover:opacity-15'}`}
                      style={{ background: `radial-gradient(circle, ${mood.color} 0%, transparent 70%)` }} 
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                      <Icon
                        className="w-14 h-14 mb-6 transition-all duration-700 stroke-[1.5]"
                        style={{
                          color: isSelected || isHovered ? mood.color : 'var(--color-foreground)',
                          transform: isHovered || isSelected ? 'scale(1.15)' : 'scale(1)',
                        }}
                      />
                      <h3
                        className="text-3xl mb-3 text-foreground"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {mood.title}
                      </h3>
                      
                      {isSelected && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-1/4 right-1/4 text-primary bg-background/50 rounded-full p-1"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Mindset Captured Message */}
        <div className="h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedMood && (
              <motion.div
                key={selectedMood.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="text-center flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 mb-6 text-primary font-medium tracking-widest text-sm uppercase bg-primary/5 px-6 py-2 rounded-full border border-primary/20">
                  <span>✓</span> Mood Captured
                </div>
                
                <h4 className="text-4xl md:text-5xl mb-10 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
                  {selectedMood.response}
                </h4>

                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('blend')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 bg-transparent border border-primary/30 rounded-full text-foreground font-medium transition-all duration-700 hover:bg-primary/5 hover:border-primary/60 flex items-center gap-4 group shadow-xl hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)]"
                >
                  <span className="tracking-widest uppercase text-sm">Continue Brewing</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-700 text-primary" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

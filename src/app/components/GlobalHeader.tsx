import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';

export function GlobalHeader() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(17, 11, 8, 0)', 'rgba(17, 11, 8, 0.65)'] // Deep Espresso transition
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(24px)'] // Smoother, deeper blur
  );

  const [activeSection, setActiveSection] = useState('discover');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['discover', 'brew', 'mood', 'blend', 'beats', 'wall'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'discover', label: 'Discover' },
    { id: 'brew', label: 'Brew' },
    { id: 'mood', label: 'Mood' },
    { id: 'blend', label: 'Blend' },
    { id: 'wall', label: 'Wall' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      style={{ backgroundColor, backdropFilter }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between border-b border-border/0 hover:border-border/50 transition-colors duration-700"
    >
      <div className="flex items-center gap-4">
        {/* Custom Logo Concept: Coffee cup where steam forms a thought bubble */}
        <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent rounded-full border border-primary/20 overflow-hidden group">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="z-10 relative text-primary">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            {/* Steam / Thought Bubble concept */}
            <path d="M7 2c1.5 0 1.5 2 3 2s1.5-2 3-2 1.5 2 3 2" className="animate-pulse opacity-70" />
          </svg>
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
        </div>
        <span className="font-normal text-xl tracking-wide hidden sm:block text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
          Coffee Studio
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-10">
        {navItems.map((item) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            className={`text-sm tracking-widest uppercase transition-colors duration-500 relative group py-2 ${
              activeSection === item.id ? 'text-primary font-medium' : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            {item.label}
            {/* Active / Hover Indicator */}
            <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-primary transition-all duration-700 ease-out ${
              activeSection === item.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-40'
            }`} />
          </motion.a>
        ))}
      </nav>

      <motion.button
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('wall')?.scrollIntoView({ behavior: 'smooth' });
        }}
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212, 175, 55, 0.15)' }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-3 bg-transparent border border-primary/30 rounded-full text-foreground text-sm font-medium hover:border-primary/60 hover:bg-primary/5 transition-all duration-700 flex items-center gap-3 group"
      >
        <span className="tracking-wide">Join The Wall</span>
        <span className="transform transition-transform duration-700 group-hover:translate-x-2 text-primary">→</span>
      </motion.button>
    </motion.header>
  );
}

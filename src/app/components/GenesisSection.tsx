import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export function GenesisSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToNext = () => {
    document.getElementById('brew')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full flex items-start justify-center overflow-hidden bg-transparent pt-40">
      
      {/* Layer 1: Full-screen cinematic coffee video */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-pouring-coffee-in-a-glass-cup-2321/1080p.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Layer 2: Coffee-colored gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-background/60 to-background pointer-events-none mix-blend-multiply z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-0 opacity-90" />

      {/* Layer 3: Animated steam (Subtle and cinematic) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-20">
        <motion.div
          animate={{ y: ['10%', '-30%'], x: ['-1%', '1%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear', repeatType: 'mirror' }}
          className="absolute inset-0 w-[150%] h-[150%] -left-[25%] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC4wMDUiIG51bU9jdGF2ZXM9IjIiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')] bg-cover opacity-30 blur-[40px]"
        />
      </div>

      {/* Layer 5: Hero Content */}
      <motion.div 
        style={{ opacity, x: -mousePosition.x * 2, y: -mousePosition.y * 2 }} 
        className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center pt-40 pb-56"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="text-primary mb-12 tracking-[0.5em] uppercase text-sm font-medium"
        >
          From Bean to Emotion
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-[8rem] mb-16 text-foreground"
          style={{ fontFamily: 'var(--font-serif)', textShadow: '0 20px 40px rgba(17,11,8,0.8)' }}
        >
          Every great creation begins with a <span className="text-primary italic font-light">single thought</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          className="text-xl md:text-2xl text-foreground/70 mb-32 max-w-prose font-light leading-relaxed"
          style={{ textShadow: '0 10px 20px rgba(17,11,8,0.8)' }}
        >
          Ideas don't arrive fully formed. They evolve, adapt, and mature over time—just like the perfect brew.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Animated Glow Ring */}
          <div className="absolute -inset-2 bg-primary rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-1000 animate-pulse" />
          
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToNext}
            className="relative px-14 py-6 bg-transparent border border-primary/20 rounded-full font-medium text-foreground backdrop-blur-md overflow-hidden transition-all duration-1000 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] flex items-center gap-5 group-hover:pr-12 group"
          >
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-1000" />
            <span className="relative z-10 tracking-[0.25em] text-sm uppercase text-foreground/90 group-hover:text-foreground">Start Journey</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-1000 group-hover:translate-x-4 text-primary" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-primary/50 text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Droplets, Flame, Zap, Eye } from 'lucide-react';

interface BlendLabProps {
  onBlendChange: (blend: { strength: number; warmth: number; energy: number; mystery: number }) => void;
}

export function BlendLab({ onBlendChange }: BlendLabProps) {
  const [blend, setBlend] = useState({
    strength: 50,
    warmth: 50,
    energy: 50,
    mystery: 50,
  });

  const [insight, setInsight] = useState('');

  const handleSliderChange = (key: keyof typeof blend, value: number) => {
    const newBlend = { ...blend, [key]: value };
    setBlend(newBlend);
    onBlendChange(newBlend);
  };

  useEffect(() => {
    // Generate AI-style insight
    let newInsight = '';
    
    if (blend.strength > 70 && blend.energy > 70) {
      newInsight = 'Rich, intense, and unforgettable. Built for late-night thinkers.';
    } else if (blend.warmth > 70 && blend.mystery < 40) {
      newInsight = 'Warm and balanced. Perfect for meaningful conversations.';
    } else if (blend.energy > 60 && blend.mystery > 60) {
      newInsight = 'Energetic and mysterious. Built for people who chase curiosity.';
    } else if (blend.strength < 40 && blend.warmth > 60) {
      newInsight = 'Gentle and soothing. A calming presence in chaos.';
    } else if (blend.mystery > 80) {
      newInsight = 'Deeply complex and unknown. A brew that keeps you guessing.';
    } else {
      newInsight = 'A versatile foundation. Ready to be shaped by your day.';
    }
    
    setInsight(newInsight);
  }, [blend]);

  // Derived visual properties
  const coffeeColor = `rgba(${Math.max(50, 150 - blend.strength)}, ${Math.max(20, 80 - blend.strength * 0.5)}, ${Math.max(10, 40 - blend.strength * 0.3)}, ${0.8 + (blend.mystery / 500)})`;
  const cupGlow = `0 0 ${blend.mystery * 0.5}px rgba(${Math.max(100, blend.warmth * 2.5)}, ${Math.max(50, blend.energy)}, ${blend.mystery}, 0.5)`;
  const steamDensity = blend.warmth / 100;
  const steamSpeed = 2 - (blend.energy / 100);

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-32 px-6 relative z-10 bg-transparent">
      
      {/* Dynamic Lab Lighting Layer */}
      <div 
        className="absolute inset-0 transition-all duration-1000 mix-blend-screen opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 75% center, rgba(${blend.energy * 2}, ${blend.warmth * 1.5}, ${blend.mystery * 1.5}, 0.5) 0%, transparent 70%)`
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Interactive Controls */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-6xl mb-6 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
              Craft Your Signature Blend
            </h2>
            <p className="text-xl md:text-2xl font-light text-foreground/70 tracking-wide mb-8">
              Every great brew has a personality. Create yours.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm uppercase tracking-[0.2em] font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Adjust the sliders below
            </motion.div>
          </motion.div>

          <div className="space-y-10 p-10 rounded-[2.5rem] border border-primary/10 bg-card/80 backdrop-blur-3xl shadow-[0_30px_60px_rgba(17,11,8,0.5)]">
            <SliderControl 
              icon={Droplets} label="Strength" value={blend.strength} color="#6F4E37" // Warm Brown
              onChange={(val) => handleSliderChange('strength', val)} 
            />
            <SliderControl 
              icon={Flame} label="Warmth" value={blend.warmth} color="#C9A66B" // Cream Highlight
              onChange={(val) => handleSliderChange('warmth', val)} 
            />
            <SliderControl 
              icon={Zap} label="Energy" value={blend.energy} color="#D4AF37" // Metallic Gold
              onChange={(val) => handleSliderChange('energy', val)} 
            />
            <SliderControl 
              icon={Eye} label="Mystery" value={blend.mystery} color="#3B2A1A" // Dark Mocha
              onChange={(val) => handleSliderChange('mystery', val)} 
            />
          </div>
        </div>

        {/* Right: Visual Centerpiece & AI Insight */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-12">
          
          {/* Realistic Glass Coffee Cup representation */}
          <div className="relative w-80 h-96 flex items-center justify-center">
            
            {/* Dynamic Steam */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 h-64 pointer-events-none flex justify-center gap-4 overflow-visible mix-blend-screen z-20">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-full bg-[#F5F1E8] blur-[20px] rounded-full"
                  style={{ opacity: steamDensity * (0.2 + Math.random() * 0.3) }}
                  animate={{
                    y: ['10%', '-100%'],
                    x: [Math.random() * 40 - 20, Math.random() * 60 - 30],
                    scaleX: [1, 3, 1],
                    opacity: [0, steamDensity * 0.6, 0],
                  }}
                  transition={{
                    duration: steamSpeed * (Math.random() * 3 + 2),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4
                  }}
                />
              ))}
            </div>

            {/* The Glass Cup Container */}
            <motion.div 
              className="relative w-56 h-72 rounded-b-[70px] rounded-t-2xl border-x-[4px] border-b-[12px] border-white/10 backdrop-blur-md overflow-hidden z-10 transition-shadow duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.05),_0_20px_50px_rgba(0,0,0,0.5)]"
              style={{ boxShadow: `inset 0 0 30px rgba(255,255,255,0.05), ${cupGlow}`, backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              {/* Cup Rim Highlight */}
              <div className="absolute top-0 w-full h-[6px] bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl z-20" />
              
              {/* Cup Side Reflections */}
              <div className="absolute top-0 left-2 w-6 h-full bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-60 blur-md z-20" />
              <div className="absolute top-0 right-4 w-3 h-full bg-gradient-to-l from-white/10 to-transparent rounded-full opacity-40 blur-[2px] z-20" />

              {/* Coffee Liquid */}
              <div 
                className="absolute bottom-0 w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ 
                  height: `${blend.strength * 0.7 + 15}%`, 
                  backgroundColor: coffeeColor,
                  boxShadow: `inset 0 20px 40px rgba(0,0,0,0.8), inset 0 -10px 20px ${coffeeColor}`
                }}
              >
                {/* Animated Liquid Surface (SVG Wave) */}
                <div className="absolute -top-[14px] w-[200%] h-8 left-0 flex animate-wave overflow-visible z-10">
                  <svg className="w-1/2 h-full fill-current" style={{ color: coffeeColor }} viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 C20,20 30,0 50,10 C70,20 80,0 100,10 L100,20 L0,20 Z" />
                  </svg>
                  <svg className="w-1/2 h-full fill-current" style={{ color: coffeeColor }} viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 C20,20 30,0 50,10 C70,20 80,0 100,10 L100,20 L0,20 Z" />
                  </svg>
                </div>

                {/* Surface reflection */}
                <div className="absolute top-0 w-full h-8 bg-gradient-to-b from-white/10 to-transparent opacity-50 mix-blend-overlay z-10" />
                
                {/* Internal particles (Mystery & Energy) - Reduced density for elegance */}
                {[...Array(Math.floor(blend.mystery / 15 + blend.energy / 20))].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 3 + 2 + 'px',
                      height: Math.random() * 3 + 2 + 'px',
                      backgroundColor: Math.random() > 0.5 ? 'var(--color-primary)' : 'var(--color-foreground)',
                      boxShadow: '0 0 10px rgba(212,175,55,0.3)',
                      opacity: (blend.mystery / 100) * 0.4
                    }}
                    initial={{ left: `${Math.random() * 100}%`, top: '100%' }}
                    animate={{ top: '-20%', x: [0, Math.random() * 20 - 10, 0] }}
                    transition={{ 
                      duration: (400 / (blend.energy + 10)) * (Math.random() * 2 + 1), 
                      repeat: Infinity, 
                      ease: 'linear',
                      delay: Math.random() * 5
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Cup Base Shadow */}
            <div className="absolute -bottom-6 w-48 h-8 bg-black/60 rounded-[100%] blur-xl" />
          </div>

          {/* AI Insight Panel */}
          <motion.div 
            key={insight}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-md p-8 rounded-3xl border border-primary/20 bg-popover/80 backdrop-blur-2xl text-center shadow-[0_20px_50px_rgba(17,11,8,0.6)]"
          >
            <div className="text-primary text-xs uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-3 font-medium">
              <Zap className="w-3.5 h-3.5" /> AI Insight
            </div>
            <p className="text-xl font-light text-foreground italic leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
              "{insight}"
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function SliderControl({ icon: Icon, label, value, color, onChange }: { icon: any, label: string, value: number, color: string, onChange: (val: number) => void }) {
  return (
    <div className="flex flex-col gap-4 group">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 text-foreground/70 group-hover:text-foreground transition-colors duration-500">
          <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" style={{ color }} />
          <span className="font-medium tracking-[0.2em] uppercase text-sm">{label}</span>
        </div>
        <span className="text-sm font-mono text-foreground/40 bg-foreground/5 px-2 py-1 rounded-md">{value}%</span>
      </div>
      <div className="relative h-3 bg-white/5 rounded-full overflow-hidden cursor-pointer group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/10 shadow-inner">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
        />
        <motion.div 
          className="absolute top-0 left-0 h-full rounded-full flex justify-end items-center"
          style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Slider Thumb Visual */}
          <div className="w-3 h-3 bg-white rounded-full mr-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>
    </div>
  );
}

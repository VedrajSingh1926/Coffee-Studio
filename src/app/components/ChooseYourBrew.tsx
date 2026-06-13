import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Droplets, CloudSun, Moon, CloudRain, Star, Shield, Zap } from 'lucide-react';

interface ChooseYourBrewProps {
  onComplete: (brew: any) => void;
}

export function ChooseYourBrew({ onComplete }: ChooseYourBrewProps) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    cup: '',
    flavor: '',
    moment: '',
  });

  const cups = [
    { id: 'Dreamer', icon: CloudSun, desc: 'For those who see what could be.' },
    { id: 'Builder', icon: Shield, desc: 'For those who construct reality.' },
    { id: 'Explorer', icon: Star, desc: 'For those seeking the unknown.' }
  ];

  const flavors = [
    { id: 'Bold', icon: Zap, desc: 'Intense and unforgettable.' },
    { id: 'Smooth', icon: Droplets, desc: 'Balanced and effortless.' },
    { id: 'Wild', icon: SparklesIcon, desc: 'Unpredictable and exciting.' }
  ];

  const moments = [
    { id: 'Sunrise', icon: CloudSun, desc: 'New beginnings.' },
    { id: 'Rainy Afternoon', icon: CloudRain, desc: 'Quiet focus.' },
    { id: 'Midnight', icon: Moon, desc: 'Deep thoughts.' }
  ];

  const handleSelect = (key: 'cup' | 'flavor' | 'moment', value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    setTimeout(() => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        setStep(4); // Result step
        onComplete({ ...selections, [key]: value });
        setTimeout(() => {
          document.getElementById('mood')?.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
      }
    }, 600);
  };

  const getAchievement = () => {
    if (selections.cup === 'Explorer' && selections.moment === 'Midnight') return 'Master Roaster';
    if (selections.cup === 'Dreamer' && selections.flavor === 'Wild') return 'Visionary Brewer';
    return 'Studio Artisan';
  };

  return (
    <section id="brew" className="min-h-screen w-full flex items-center justify-center py-40 px-6 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50 bg-gradient-to-b from-background to-transparent z-0" />
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
            What kind of brew are you today?
          </h2>
          <p className="text-xl md:text-2xl font-light text-foreground/70 tracking-wide mb-8">
            Craft your experience through three choices.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm uppercase tracking-[0.2em] font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Select an option below to continue
          </motion.div>
        </motion.div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepView key="step1" title="Step 1: Choose a Cup" items={cups} onSelect={(id) => handleSelect('cup', id)} />
            )}
            {step === 2 && (
              <StepView key="step2" title="Step 2: Choose a Flavor" items={flavors} onSelect={(id) => handleSelect('flavor', id)} />
            )}
            {step === 3 && (
              <StepView key="step3" title="Step 3: Choose a Moment" items={moments} onSelect={(id) => handleSelect('moment', id)} />
            )}
            {step === 4 && (
              <ResultView key="result" selections={selections} achievement={getAchievement()} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function StepView({ title, items, onSelect }: { title: string, items: any[], onSelect: (id: string) => void }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    setActiveId(id);
    onSelect(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center"
    >
      <h3 className="text-xl mb-12 text-primary uppercase tracking-[0.3em] font-medium">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={!isActive ? { scale: 1.03, y: -8 } : {}}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleItemClick(item.id)}
              className={`relative p-10 rounded-3xl border transition-all duration-700 overflow-hidden group cursor-pointer ${
                isActive 
                  ? 'border-primary bg-primary/10 scale-95 shadow-[0_0_40px_rgba(212,175,55,0.3)]' 
                  : 'border-primary/10 bg-card backdrop-blur-2xl shadow-[0_20px_50px_rgba(17,11,8,0.5)] hover:shadow-[0_30px_60px_rgba(212,175,55,0.15)] hover:border-primary/50'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              
              {/* Animated Border Glow on Hover */}
              {!isActive && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
                </div>
              )}

              <div className="relative z-10 flex flex-col items-center text-center">
                <Icon className={`w-14 h-14 mb-6 transition-all duration-700 stroke-[1.5] ${isActive ? 'text-primary scale-110' : 'text-foreground/80 group-hover:text-primary'}`} />
                <h4 className="text-2xl font-normal mb-3 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>{item.id}</h4>
                <p className="text-base font-light text-foreground/60 leading-relaxed group-hover:text-foreground/80 transition-colors duration-700">{item.desc}</p>
                
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 text-primary"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  );
}

function ResultView({ selections, achievement }: { selections: any, achievement: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      {/* Cinematic Glow Effect Instead of Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      <motion.div 
        className="relative z-10 p-14 rounded-[2.5rem] border border-primary/20 bg-popover/80 backdrop-blur-3xl shadow-[0_30px_80px_rgba(17,11,8,0.7)] overflow-hidden group max-w-2xl w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-50" />
        
        <p className="text-primary uppercase tracking-[0.4em] text-sm mb-6 font-medium">Your Brew</p>
        <h3 className="text-5xl md:text-6xl mb-8 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
          {selections.moment} {selections.cup}
        </h3>
        
        <p className="text-xl text-foreground/70 mb-12 max-w-lg mx-auto font-light leading-relaxed">
          A {selections.flavor.toLowerCase()} blend crafted for {selections.moment.toLowerCase()} moments. 
          {selections.cup === 'Explorer' ? ' Curious minds discover what others overlook.' : ''}
          {selections.cup === 'Dreamer' ? ' Imagination fuels your reality.' : ''}
          {selections.cup === 'Builder' ? ' Structure and execution define your path.' : ''}
        </p>

        <div className="inline-flex items-center gap-4 px-8 py-4 bg-primary/5 border border-primary/30 rounded-full hover:bg-primary/10 transition-colors duration-500 cursor-default">
          <Star className="w-5 h-5 text-primary" />
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Achievement: {achievement}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

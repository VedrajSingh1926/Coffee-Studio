import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Atmosphere() {
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

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0A0A]">
      {/* Layer 1: Large moving warm gradients */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, #16110D 0%, transparent 60%)',
            'radial-gradient(circle at 100% 100%, #241A12 0%, transparent 60%)',
            'radial-gradient(circle at 0% 100%, #16110D 0%, transparent 60%)',
            'radial-gradient(circle at 100% 0%, #241A12 0%, transparent 60%)',
            'radial-gradient(circle at 0% 0%, #16110D 0%, transparent 60%)',
          ]
        }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-80 mix-blend-screen"
      />

      {/* Layer 2: Soft ambient light flares */}
      <motion.div
        style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
        className="absolute inset-0 flex justify-center items-center opacity-40 mix-blend-screen"
      >
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[10%] right-[20%] w-[60vw] h-[2px] bg-gradient-to-r from-transparent via-[#6F4E37]/30 to-transparent blur-[8px]" 
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[20%] left-[10%] w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent blur-[4px]" 
        />
      </motion.div>

      {/* Layer 3: Very subtle drifting steam */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`steam-${i}`}
            className="absolute -bottom-[20%] w-[40vw] h-[60vh] bg-white rounded-[100%] blur-[80px]"
            style={{ left: `${20 + i * 30}%`, opacity: 0.05 + i * 0.02 }}
            animate={{
              y: ['0vh', '-120vh'],
              x: [0, (i % 2 === 0 ? 100 : -100), 0],
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: 25 + i * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 5,
            }}
          />
        ))}
      </div>

      {/* Layer 4: Coffee-colored glow blobs */}
      <motion.div
        animate={{
          x: ['0%', '10%', '-5%', '0%'],
          y: ['0%', '-10%', '5%', '0%'],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#3B2A1A]/30 blur-[150px] mix-blend-screen"
      />
      <motion.div
        animate={{
          x: ['0%', '-15%', '10%', '0%'],
          y: ['0%', '15%', '-10%', '0%'],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{ duration: 55, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
        className="absolute top-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-[#6F4E37]/20 blur-[130px] mix-blend-screen"
      />

      {/* Layer 5: Tiny floating particles */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              backgroundColor: Math.random() > 0.5 ? '#D4AF37' : '#F5F1E8',
              boxShadow: '0 0 8px rgba(212,175,55,0.4)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -200 - 100],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
    </div>
  );
}

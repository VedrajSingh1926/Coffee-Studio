import { motion } from 'motion/react';
import { Headphones, Play, Pause, Disc3 } from 'lucide-react';

export const tracks = [
  { id: 'focus', title: 'Deep Focus', theme: 'particles', desc: 'Minimalist ambient sounds.', youtubeId: 'jfKfPfyJRdk' },
  { id: 'coding', title: 'Late Night Coding', theme: 'blue-glow', desc: 'Electronic beats for flow state.', youtubeId: '4xDzrIxZZZG' },
  { id: 'rain', title: 'Rain & Coffee', theme: 'rain', desc: 'Cozy acoustic and rainfall.', youtubeId: 'c0_ejQQcrwI' },
  { id: 'creative', title: 'Creative Flow', theme: 'colorful', desc: 'Upbeat and inspiring rhythms.', youtubeId: '5qap5aO4i9A' },
  { id: 'jazz', title: 'Jazz Café', theme: 'gold-glow', desc: 'Warm saxophone and piano.', youtubeId: 'Dx5qFachd3A' },
  { id: 'lofi', title: 'Lo-Fi Study', theme: 'chill', desc: 'Relaxing hip-hop instrumentals.', youtubeId: 'TFwE68D-D50' }
];

interface BrewAndBeatsProps {
  currentTrackId: string | null;
  isPlaying: boolean;
  onSelectTrack: (trackId: string) => void;
  onTogglePlay: () => void;
}

export function BrewAndBeats({ currentTrackId, isPlaying, onSelectTrack, onTogglePlay }: BrewAndBeatsProps) {
  return (
    <section id="beats" className="min-h-screen w-full flex items-center justify-center py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
            Every brew deserves a soundtrack.
          </h2>
          <p className="text-xl md:text-2xl font-light text-foreground/70 tracking-wide max-w-prose mx-auto mb-8">
            Choose what plays while your ideas brew. The music follows you.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm uppercase tracking-[0.2em] font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Choose a soundtrack below
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, i) => {
            const isActive = currentTrackId === track.id;

            return (
              <motion.button
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelectTrack(track.id)}
                whileHover={!isActive ? { scale: 1.02, y: -6 } : {}}
                whileTap={{ scale: 0.98 }}
                className={`relative p-8 rounded-[2rem] border text-left transition-all duration-700 overflow-hidden group cursor-pointer ${
                  isActive
                    ? 'border-primary/50 bg-primary/10 shadow-[0_20px_50px_rgba(212,175,55,0.2)] scale-95 ring-2 ring-primary/20'
                    : 'border-primary/10 bg-card/50 backdrop-blur-md hover:border-primary/40 hover:bg-card/80 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)]'
                }`}
              >
                {/* Active Glow */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-3xl opacity-50" />
                )}

                {/* Hover Glow */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                )}

                <div className="relative z-10 flex items-start gap-5">
                  <div className={`p-4 rounded-full flex-shrink-0 transition-colors duration-500 ${isActive ? 'bg-primary text-primary-foreground' : 'bg-background/80 text-primary/80 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                    {isActive && isPlaying ? (
                      <Disc3 className="w-7 h-7 animate-spin-slow stroke-[1.5]" />
                    ) : (
                      <Headphones className="w-7 h-7 stroke-[1.5]" />
                    )}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-2xl font-normal text-foreground mb-2 group-hover:text-primary transition-colors duration-500" style={{ fontFamily: 'var(--font-serif)' }}>{track.title}</h3>
                    <p className="text-base font-light text-foreground/60 leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">{track.desc}</p>
                  </div>
                </div>

                {/* Play Indicator Overlay */}
                <div className={`absolute top-6 right-6 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                  {isPlaying && isActive ? (
                    <div className="flex gap-1.5 h-5 items-end">
                      <span className="w-1.5 bg-primary rounded-t animate-soundwave" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 bg-primary rounded-t animate-soundwave" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 bg-primary rounded-t animate-soundwave" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <Play className="w-6 h-6 text-primary fill-current opacity-80" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Global Player Hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-primary/70 text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 font-medium">
            <Disc3 className="w-4 h-4 animate-spin-slow stroke-[1.5]" />
            Music plays seamlessly across the experience
          </p>
        </motion.div>
      </div>
    </section>
  );
}

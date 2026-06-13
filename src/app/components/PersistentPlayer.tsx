import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, X, Music } from 'lucide-react';
import { tracks } from './BrewAndBeats';

interface PersistentPlayerProps {
  currentTrackId: string | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onClose: () => void;
}

export function PersistentPlayer({ currentTrackId, isPlaying, onTogglePlay, onNextTrack, onClose }: PersistentPlayerProps) {
  const currentTrack = tracks.find(t => t.id === currentTrackId);

  return (
    <AnimatePresence>
      {currentTrackId && currentTrack && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 30, stiffness: 150 }}
          className="fixed bottom-6 right-6 z-50 p-4 bg-popover/80 backdrop-blur-[32px] border border-primary/20 rounded-[20px] shadow-[0_20px_50px_rgba(17,11,8,0.7)] flex items-center gap-5 group hover:border-primary/40 transition-all duration-700"
        >
          {/* YouTube Embed Container */}
          <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-white/10 shadow-inner">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=1&loop=1&playlist=${currentTrack.youtubeId}&controls=0&disablekb=1&fs=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.5] pointer-events-none"
            ></iframe>
            {/* Overlay to prevent clicking iframe directly */}
          {/* Overlay to prevent clicking iframe directly */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-color pointer-events-none" />
          </div>

          {/* Track Info */}
          <div className="flex flex-col min-w-[120px] max-w-[160px]">
            <span className="text-sm font-medium text-foreground truncate tracking-wide" style={{ fontFamily: 'var(--font-serif)' }}>{currentTrack.title}</span>
            <span className="text-xs text-primary/80 truncate tracking-wider uppercase mt-0.5">Now Playing</span>
          </div>

          {/* Controls (Visual representation since iframe is auto-playing) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onNextTrack}
              className="p-2 rounded-full hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors duration-500"
              title="Next Track"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>

          {/* Close button (appears on hover) */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 p-1.5 bg-card border border-primary/30 rounded-full text-foreground/50 hover:text-foreground hover:bg-destructive/80 hover:border-destructive/50 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect } from 'react';
import { GlobalHeader } from './components/GlobalHeader';
import { GenesisSection } from './components/GenesisSection';
import { ChooseYourBrew } from './components/ChooseYourBrew';
import { MoodMatrix } from './components/MoodMatrix';
import { BlendLab } from './components/BlendLab';
import { BrewAndBeats, tracks } from './components/BrewAndBeats';
import { Revelation } from './components/Revelation';
import { CommunityWall } from './components/CommunityWall';
import { PersistentPlayer } from './components/PersistentPlayer';
import { Atmosphere } from './components/Atmosphere';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [userChoices, setUserChoices] = useState({
    brew: null,
    mood: '',
    blend: { strength: 50, warmth: 50, energy: 50, mystery: 50 },
  });

  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const updateUserData = (data: Partial<typeof userChoices>) => {
    setUserChoices(prev => ({ ...prev, ...data }));
  };

  const handleSelectTrack = (trackId: string) => {
    if (currentTrackId === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackId(trackId);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (!currentTrackId) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrackId(tracks[nextIndex].id);
    setIsPlaying(true);
  };

  // Global visual themes based on audio track
  const currentTrack = tracks.find(t => t.id === currentTrackId);
  const globalThemeClass = currentTrack ? `theme-${currentTrack.theme}` : 'theme-default';

  return (
    <div className={`min-h-screen text-[#F5F1E8] overflow-x-hidden selection:bg-[#C9A66B]/30 ${globalThemeClass}`}>
      <GlobalHeader />
      
      {/* Global Background Atmosphere Layer */}
      <Atmosphere />

      {/* Dynamic theme audio overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatePresence>
          {currentTrack?.theme === 'blue-glow' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-blue-500/20 mix-blend-screen" />
          )}
          {currentTrack?.theme === 'gold-glow' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-yellow-500/20 mix-blend-screen" />
          )}
          {currentTrack?.theme === 'rain' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-800/40 mix-blend-multiply" />
          )}
        </AnimatePresence>
      </div>

      <main className="relative z-10 flex flex-col">
        <div id="discover"><GenesisSection /></div>
        <ChooseYourBrew onComplete={(brew) => updateUserData({ brew })} />
        <div id="mood"><MoodMatrix onSelect={(mood) => updateUserData({ mood })} /></div>
        <div id="blend"><BlendLab onBlendChange={(blend) => updateUserData({ blend })} /></div>
        <BrewAndBeats 
          currentTrackId={currentTrackId} 
          isPlaying={isPlaying} 
          onSelectTrack={handleSelectTrack}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
        />
        <Revelation userData={userChoices} />
        <div id="wall"><CommunityWall /></div>
      </main>

      <PersistentPlayer 
        currentTrackId={currentTrackId}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNextTrack={handleNextTrack}
        onClose={() => { setCurrentTrackId(null); setIsPlaying(false); }}
      />
    </div>
  );
}
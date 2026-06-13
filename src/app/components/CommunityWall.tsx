import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Coffee, Flame, Lightbulb, Sparkles } from 'lucide-react';

interface Post {
  id: string;
  text: string;
  type: string;
  reactions: { inspired: number; motivated: number; interesting: number };
  timestamp: Date;
}

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    text: 'Building my first startup. Coffee is the only thing keeping the dream alive right now.',
    type: 'Goal',
    reactions: { inspired: 12, motivated: 5, interesting: 2 },
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    text: 'Learning React and creating smooth animations. This framework is wild.',
    type: 'Experience',
    reactions: { inspired: 3, motivated: 15, interesting: 8 },
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: '3',
    text: 'What if we redesigned the way people experience digital storytelling?',
    type: 'Idea',
    reactions: { inspired: 20, motivated: 10, interesting: 42 },
    timestamp: new Date(Date.now() - 14400000),
  },
  {
    id: '4',
    text: 'Finally releasing my first EP tonight. Pouring a dark roast to celebrate.',
    type: 'Dream',
    reactions: { inspired: 45, motivated: 22, interesting: 5 },
    timestamp: new Date(Date.now() - 28800000),
  }
];

export function CommunityWall() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [selectedType, setSelectedType] = useState('Thought');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const types = ['Idea', 'Goal', 'Dream', 'Thought', 'Experience'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newPost: Post = {
        id: Date.now().toString(),
        text: newPostText,
        type: selectedType,
        reactions: { inspired: 0, motivated: 0, interesting: 0 },
        timestamp: new Date(),
      };
      
      setPosts([newPost, ...posts]);
      setNewPostText('');
      setIsSubmitting(false);
    }, 600);
  };

  const handleReact = (postId: string, reactionType: keyof Post['reactions']) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reactionType]: post.reactions[reactionType] + 1
          }
        };
      }
      return post;
    }));
  };

  return (
    <section className="min-h-screen w-full py-32 px-6 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
            Every brew has a story.
          </h2>
          <p className="text-xl md:text-2xl font-light text-foreground/70 tracking-wide max-w-prose mx-auto">
            Share what you're currently brewing with the community.
          </p>
        </motion.div>

        {/* Input Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto mb-24 p-8 md:p-10 rounded-[2.5rem] border border-primary/20 bg-card/60 backdrop-blur-3xl shadow-[0_30px_60px_rgba(17,11,8,0.5)] relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[2.5rem] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Share an idea, dream, thought or goal..."
              className="w-full bg-transparent border-none outline-none resize-none text-foreground placeholder-foreground/30 text-xl md:text-2xl font-light leading-relaxed min-h-[120px]"
            />
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-primary/10">
              <div className="flex flex-wrap gap-3">
                {types.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-500 ${
                      selectedType === type 
                        ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                        : 'bg-background/50 text-foreground/60 hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              <motion.button
                type="submit"
                disabled={!newPostText.trim() || isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-transparent border border-primary/40 hover:bg-primary/10 hover:border-primary/60 text-foreground rounded-full font-medium tracking-[0.1em] uppercase text-sm flex items-center gap-3 transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] group"
              >
                {isSubmitting ? (
                  <Sparkles className="w-5 h-5 animate-spin text-primary" />
                ) : (
                  <Send className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-500" />
                )}
                <span>Publish</span>
              </motion.button>
            </div>
          </div>
        </motion.form>

        {/* Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-10 rounded-[2rem] border border-primary/10 bg-card backdrop-blur-xl shadow-[0_20px_50px_rgba(17,11,8,0.4)] hover:shadow-[0_30px_60px_rgba(212,175,55,0.1)] hover:border-primary/30 transition-all duration-700 group flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-medium tracking-[0.2em] uppercase px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                      {post.type}
                    </span>
                    <span className="text-sm font-mono text-foreground/40">
                      {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(post.timestamp)}
                    </span>
                  </div>
                  <p className="text-foreground/90 text-lg font-light leading-relaxed mb-8">
                    {post.text}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-primary/10">
                  <ReactionButton 
                    icon={Coffee} count={post.reactions.inspired} label="Inspired" 
                    onClick={() => handleReact(post.id, 'inspired')} 
                  />
                  <ReactionButton 
                    icon={Flame} count={post.reactions.motivated} label="Motivated" 
                    onClick={() => handleReact(post.id, 'motivated')} 
                  />
                  <ReactionButton 
                    icon={Lightbulb} count={post.reactions.interesting} label="Interesting" 
                    onClick={() => handleReact(post.id, 'interesting')} 
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ReactionButton({ icon: Icon, count, label, onClick }: { icon: any, count: number, label: string, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-primary/5 text-foreground/50 hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-colors duration-500 group"
      title={label}
    >
      <Icon className="w-4 h-4" />
      <span className="text-xs font-medium tracking-wide">{count > 0 ? count : ''}</span>
    </motion.button>
  );
}

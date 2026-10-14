import { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';
import ContentDetail from '../components/ContentDetail';
import { Content, getFeaturedContent, getTrendingContent, getMovies, getSeries, contentData, sources } from '../data/content';
import { Gift, Wifi, BookOpen, Landmark, Sparkles } from 'lucide-react';

interface HomePageProps {
  myList: string[];
  onAddToList: (content: Content) => void;
}

export default function HomePage({ myList, onAddToList }: HomePageProps) {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [topRated, setTopRated] = useState<Content[]>([]);
  const [newReleases, setNewReleases] = useState<Content[]>([]);
  const [actionContent, setActionContent] = useState<Content[]>([]);
  const [scifiContent, setSciFiContent] = useState<Content[]>([]);
  const [classicsContent, setClassicsContent] = useState<Content[]>([]);

  useEffect(() => {
    setTopRated([...contentData].sort((a, b) => b.rating - a.rating).slice(0, 10));
    setNewReleases([...contentData].sort((a, b) => b.year - a.year).slice(0, 10));
    setActionContent(contentData.filter(c => c.genre.includes('Action')));
    setSciFiContent(contentData.filter(c => c.genre.includes('Sci-Fi')));
    setClassicsContent(contentData.filter(c => c.genre.includes('Classic')));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <HeroBanner content={getFeaturedContent()} onSelect={setSelectedContent} />
      
      <div className="relative -mt-20 z-10 space-y-2 pb-20">
        {/* Free Sources Banner */}
        <div className="px-4 md:px-8 max-w-[1920px] mx-auto">
          <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/10 border border-green-500/20 rounded-xl p-4 md:p-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                  <Gift size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">All Content is 100% Free</h3>
                  <p className="text-white/50 text-xs">Stream from {sources.length} free sources • No subscription needed • Legal & safe</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-[10px]">
                  <Wifi size={10} /> Ad-Supported
                </span>
                <span className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 text-[10px]">
                  <BookOpen size={10} /> Library Card
                </span>
                <span className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-purple-400 text-[10px]">
                  <Landmark size={10} /> Public Domain
                </span>
                <span className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-amber-400 text-[10px]">
                  <Sparkles size={10} /> Free Tier
                </span>
              </div>
            </div>
          </div>
        </div>

        <ContentRow
          title="🔥 Trending Free"
          content={getTrendingContent()}
          onSelect={setSelectedContent}
          onAddToList={onAddToList}
          myList={myList}
          size="large"
        />
        
        <ContentRow
          title="⭐ Top Rated (Free)"
          content={topRated}
          onSelect={setSelectedContent}
          onAddToList={onAddToList}
          myList={myList}
        />

        <ContentRow
          title="🏛️ Public Domain Classics"
          content={classicsContent}
          onSelect={setSelectedContent}
          onAddToList={onAddToList}
          myList={myList}
        />

        <ContentRow
          title="💥 Action & Adventure"
          content={actionContent}
          onSelect={setSelectedContent}
          onAddToList={onAddToList}
          myList={myList}
        />

        <ContentRow
          title="🚀 Sci-Fi Collection"
          content={scifiContent}
          onSelect={setSelectedContent}
          onAddToList={onAddToList}
          myList={myList}
        />

        <ContentRow
          title="📺 Free Series"
          content={getSeries()}
          onSelect={setSelectedContent}
          onAddToList={onAddToList}
          myList={myList}
          size="large"
        />

        <ContentRow
          title="🎥 Free Movies"
          content={getMovies()}
          onSelect={setSelectedContent}
          onAddToList={onAddToList}
          myList={myList}
          size="large"
        />
      </div>

      {selectedContent && (
        <ContentDetail
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
          onAddToList={onAddToList}
          isInList={myList.includes(selectedContent.id)}
        />
      )}
    </div>
  );
}

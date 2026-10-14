import { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';
import ContentDetail from '../components/ContentDetail';
import { Content, getFeaturedContent, getTrendingContent, getMovies, getSeries, contentData } from '../data/content';

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

  useEffect(() => {
    setTopRated([...contentData].sort((a, b) => b.rating - a.rating).slice(0, 10));
    setNewReleases([...contentData].sort((a, b) => b.year - a.year).slice(0, 10));
    setActionContent(contentData.filter(c => c.genre.includes('Action')));
    setSciFiContent(contentData.filter(c => c.genre.includes('Sci-Fi')));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <HeroBanner content={getFeaturedContent()} onSelect={setSelectedContent} />
      
      <div className="relative -mt-20 z-10 space-y-2 pb-20">
        <ContentRow
          title="🔥 Trending Now"
          content={getTrendingContent()}
          onSelect={setSelectedContent}
          onAddToList={onAddToList}
          myList={myList}
          size="large"
        />
        
        <ContentRow
          title="⭐ Top Rated"
          content={topRated}
          onSelect={setSelectedContent}
          onAddToList={onAddToList}
          myList={myList}
        />

        <ContentRow
          title="🎬 New Releases"
          content={newReleases}
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
          title="📺 Popular Series"
          content={getSeries()}
          onSelect={setSelectedContent}
          onAddToList={onAddToList}
          myList={myList}
          size="large"
        />

        <ContentRow
          title="🎥 Blockbuster Movies"
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

import { useState } from 'react';
import { Tv, Gift } from 'lucide-react';
import ContentRow from '../components/ContentRow';
import ContentDetail from '../components/ContentDetail';
import { Content, getSeries } from '../data/content';

interface SeriesPageProps {
  myList: string[];
  onAddToList: (content: Content) => void;
}

export default function SeriesPage({ myList, onAddToList }: SeriesPageProps) {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const series = getSeries();
  const trendingSeries = series.filter(s => s.trending);
  const actionSeries = series.filter(s => s.genre.includes('Action'));
  const dramaSeries = series.filter(s => s.genre.includes('Drama'));
  const topRatedSeries = [...series].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-20">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="px-4 md:px-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Tv size={28} className="text-green-400" />
            <h1 className="text-white text-3xl font-black">Free TV Series</h1>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-medium">
              <Gift size={10} /> All Free
            </span>
          </div>
          <p className="text-white/50 text-sm">
            Binge-worthy series from {new Set(series.flatMap(s => s.sources.map(src => src.name))).size} free streaming sources — no subscription needed
          </p>
        </div>

        {/* Featured Series Banner */}
        {series.length > 0 && (
          <div className="px-4 md:px-8 mb-8">
            <div 
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedContent(series[0])}
            >
              <img
                src={series[0].backdrop}
                alt={series[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded uppercase mb-3 inline-block">
                  <Gift size={10} /> Featured Free Series
                </span>
                <h2 className="text-white text-2xl md:text-4xl font-black mb-2">{series[0].title}</h2>
                <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
                  <span>{series[0].seasons} Seasons</span>
                  <span className="w-1 h-1 bg-white/40 rounded-full" />
                  <span>{series[0].episodes} Episodes</span>
                  <span className="w-1 h-1 bg-white/40 rounded-full" />
                  <span>{series[0].genre.join(', ')}</span>
                </div>
                <p className="text-white/60 text-sm max-w-lg line-clamp-2">{series[0].description}</p>
                <div className="flex items-center gap-2 mt-3">
                  {series[0].sources.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-white/70 text-xs">
                      {s.logo} {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <ContentRow
            title="🔥 Trending Series"
            content={trendingSeries}
            onSelect={setSelectedContent}
            onAddToList={onAddToList}
            myList={myList}
            size="large"
          />

          <ContentRow
            title="⭐ Top Rated Series"
            content={topRatedSeries}
            onSelect={setSelectedContent}
            onAddToList={onAddToList}
            myList={myList}
            size="large"
          />

          <ContentRow
            title="💥 Action Series"
            content={actionSeries}
            onSelect={setSelectedContent}
            onAddToList={onAddToList}
            myList={myList}
          />

          <ContentRow
            title="🎭 Drama Series"
            content={dramaSeries}
            onSelect={setSelectedContent}
            onAddToList={onAddToList}
            myList={myList}
          />

          <ContentRow
            title="📺 All Series"
            content={series}
            onSelect={setSelectedContent}
            onAddToList={onAddToList}
            myList={myList}
            size="large"
          />
        </div>
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

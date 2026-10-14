import { useState } from 'react';
import { Film } from 'lucide-react';
import ContentRow from '../components/ContentRow';
import ContentDetail from '../components/ContentDetail';
import { Content, getMovies, contentData } from '../data/content';

interface MoviesPageProps {
  myList: string[];
  onAddToList: (content: Content) => void;
}

export default function MoviesPage({ myList, onAddToList }: MoviesPageProps) {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const movies = getMovies();
  const actionMovies = movies.filter(m => m.genre.includes('Action'));
  const sciFiMovies = movies.filter(m => m.genre.includes('Sci-Fi'));
  const dramaMovies = movies.filter(m => m.genre.includes('Drama'));
  const topRatedMovies = [...movies].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-20">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="px-4 md:px-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Film size={28} className="text-red-400" />
            <h1 className="text-white text-3xl font-black">Movies</h1>
          </div>
          <p className="text-white/50 text-sm">
            Explore our collection of {movies.length} movies from multiple streaming sources
          </p>
        </div>

        {/* Featured Movie Banner */}
        {movies.length > 0 && (
          <div className="px-4 md:px-8 mb-8">
            <div 
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedContent(movies[0])}
            >
              <img
                src={movies[0].backdrop}
                alt={movies[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase mb-3 inline-block">
                  Featured Movie
                </span>
                <h2 className="text-white text-2xl md:text-4xl font-black mb-2">{movies[0].title}</h2>
                <p className="text-white/60 text-sm max-w-lg line-clamp-2">{movies[0].description}</p>
                <div className="flex items-center gap-2 mt-3">
                  {movies[0].sources.map((s, i) => (
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
            title="⭐ Top Rated Movies"
            content={topRatedMovies}
            onSelect={setSelectedContent}
            onAddToList={onAddToList}
            myList={myList}
            size="large"
          />

          <ContentRow
            title="💥 Action Movies"
            content={actionMovies}
            onSelect={setSelectedContent}
            onAddToList={onAddToList}
            myList={myList}
          />

          <ContentRow
            title="🚀 Sci-Fi Movies"
            content={sciFiMovies}
            onSelect={setSelectedContent}
            onAddToList={onAddToList}
            myList={myList}
          />

          <ContentRow
            title="🎭 Drama Movies"
            content={dramaMovies}
            onSelect={setSelectedContent}
            onAddToList={onAddToList}
            myList={myList}
          />

          <ContentRow
            title="🎬 All Movies"
            content={movies}
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

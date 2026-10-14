import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Gift } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import ContentDetail from '../components/ContentDetail';
import { Content, searchContent, genres, getContentByGenre } from '../data/content';

interface SearchPageProps {
  myList: string[];
  onAddToList: (content: Content) => void;
  initialQuery?: string;
}

export default function SearchPage({ myList, onAddToList, initialQuery }: SearchPageProps) {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam || initialQuery || '');
  const [results, setResults] = useState<Content[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [viewMode, setViewMode] = useState<'search' | 'browse'>('search');

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
      setResults(searchContent(queryParam));
      setViewMode('search');
    }
  }, [queryParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setResults(searchContent(query));
      setViewMode('search');
    }
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setResults(getContentByGenre(genre));
    setViewMode('browse');
  };

  const displayContent = viewMode === 'search' ? results : results;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex items-center gap-3 max-w-2xl">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search free movies, series, actors, genres..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Search Free
            </button>
          </form>
        </div>

        {/* Genre Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-white/50" />
            <span className="text-white/50 text-sm font-medium">Browse by Genre</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreChange(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGenre === genre
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/20'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xl font-bold">
              {viewMode === 'search' ? `Results for "${query}"` : `${selectedGenre} Collection`}
            </h2>
            <span className="text-white/40 text-sm">{displayContent.length} titles found</span>
          </div>

          {displayContent.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {displayContent.map((item) => (
                <ContentCard
                  key={item.id}
                  content={item}
                  onSelect={setSelectedContent}
                  onAddToList={onAddToList}
                  isInList={myList.includes(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-white text-xl font-semibold mb-2">No free results found</h3>
              <p className="text-white/50">Try a different search term or browse by genre to find free content</p>
            </div>
          )}
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

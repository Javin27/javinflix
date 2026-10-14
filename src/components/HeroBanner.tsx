import { useState, useEffect } from 'react';
import { Play, Info, Star, Gift } from 'lucide-react';
import { Content } from '../data/content';

interface HeroBannerProps {
  content: Content[];
  onSelect: (content: Content) => void;
}

export default function HeroBanner({ content, onSelect }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = content.length > 0 ? content : [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(featured.length, 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (featured.length === 0) return null;
  const current = featured[currentIndex % featured.length];

  return (
    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={current.backdrop}
          alt={current.title}
          className="w-full h-full object-cover transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-24 md:pb-32">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 w-full">
          <div className="max-w-2xl space-y-4">
            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg shadow-green-500/20">
                <Gift size={12} /> 100% FREE
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium rounded border border-white/20">
                {current.maturityRating}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-semibold">{current.rating}</span>
              </div>
              <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded border border-white/10">
                {current.sources.length} free sources
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              {current.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-white/70 text-sm flex-wrap">
              <span>{current.year}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>{current.duration}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>{current.genre.join(' • ')}</span>
            </div>

            {/* Description */}
            <p className="text-white/80 text-base md:text-lg leading-relaxed line-clamp-3">
              {current.description}
            </p>

            {/* Free Sources indicator */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/50 text-xs">Stream free on:</span>
              <div className="flex gap-1.5 flex-wrap">
                {current.sources.slice(0, 5).map((source, i) => (
                  <span key={i} className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-green-400/90 text-xs">
                    {source.logo} {source.name}
                  </span>
                ))}
                {current.sources.length > 5 && (
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/50 text-xs">
                    +{current.sources.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onSelect(current)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg shadow-green-500/20"
              >
                <Play size={20} fill="white" />
                Watch Free
              </button>
              <button
                onClick={() => onSelect(current)}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                <Info size={20} />
                More Info
              </button>
            </div>
          </div>

          {/* Carousel indicators */}
          {featured.length > 1 && (
            <div className="flex gap-2 mt-8">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentIndex % featured.length ? 'w-8 bg-green-400' : 'w-4 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

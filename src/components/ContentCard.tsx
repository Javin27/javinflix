import { Play, Plus, Star, ChevronDown, Gift } from 'lucide-react';
import { Content } from '../data/content';
import { useState } from 'react';

interface ContentCardProps {
  content: Content;
  onSelect: (content: Content) => void;
  onAddToList?: (content: Content) => void;
  isInList?: boolean;
  size?: 'normal' | 'large';
}

export default function ContentCard({ content, onSelect, onAddToList, isInList, size = 'normal' }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 ${
        size === 'large' ? 'min-w-[200px] md:min-w-[240px]' : 'min-w-[160px] md:min-w-[200px]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(content)}
    >
      {/* Card Image */}
      <div className={`relative rounded-lg overflow-hidden ${
        size === 'large' ? 'aspect-[2/3]' : 'aspect-[2/3]'
      } shadow-lg group-hover:shadow-2xl group-hover:shadow-green-500/10 transition-shadow duration-300`}>
        <img
          src={content.poster}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="flex items-center gap-0.5 px-2 py-0.5 bg-green-600 text-white text-[10px] font-bold rounded uppercase shadow-sm">
            <Gift size={8} /> FREE
          </span>
          {content.trending && (
            <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded uppercase">
              🔥 Trending
            </span>
          )}
          <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] font-medium rounded">
            {content.type === 'movie' ? 'Movie' : 'Series'}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded">
          <Star size={10} className="text-yellow-400" fill="currentColor" />
          <span className="text-white text-[11px] font-semibold">{content.rating}</span>
        </div>

        {/* Source count badge */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded border border-green-500/30">
          <span className="text-green-400 text-[10px] font-medium">{content.sources.length} sources</span>
        </div>

        {/* Hover overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(content); }}
              className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors shadow-lg"
            >
              <Play size={14} fill="white" className="text-white ml-0.5" />
            </button>
            {onAddToList && (
              <button
                onClick={(e) => { e.stopPropagation(); onAddToList(content); }}
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors shadow-lg ${
                  isInList ? 'bg-green-600 border-green-500' : 'bg-white/10 border-white/40 hover:border-white'
                }`}
              >
                <Plus size={14} className="text-white" />
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(content); }}
              className="w-8 h-8 bg-white/10 border border-white/40 rounded-full flex items-center justify-center hover:border-white transition-colors shadow-lg ml-auto"
            >
              <ChevronDown size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="mt-2 px-1">
        <h3 className="text-white text-sm font-semibold truncate group-hover:text-green-400 transition-colors">
          {content.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-white/50 text-xs">{content.year}</span>
          <span className="text-white/30">•</span>
          <span className="text-white/50 text-xs truncate">{content.genre[0]}</span>
        </div>
        
        {/* Source indicators */}
        <div className="flex items-center gap-1 mt-1.5">
          {content.sources.slice(0, 4).map((source, i) => (
            <span key={i} className="text-[10px] px-1.5 py-0.5 bg-green-500/5 border border-green-500/10 rounded text-white/60">
              {source.logo}
            </span>
          ))}
          {content.sources.length > 4 && (
            <span className="text-[10px] text-green-400/60">+{content.sources.length - 4}</span>
          )}
        </div>
      </div>

      {/* Hover expanded info */}
      {isHovered && (
        <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-[#1a1a2e]/95 backdrop-blur-md rounded-lg border border-green-500/10 shadow-xl z-20 hidden group-hover:block">
          <p className="text-white/70 text-xs line-clamp-2">{content.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {content.sources.map((source, i) => (
              <span key={i} className="text-[10px] px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-green-400/80">
                {source.logo} {source.name}
              </span>
            ))}
          </div>
          <p className="text-green-400/60 text-[10px] mt-2">All sources are 100% free</p>
        </div>
      )}
    </div>
  );
}

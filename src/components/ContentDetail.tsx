import { X, Play, Star, Plus, Check, ExternalLink, Shield, Globe, Monitor } from 'lucide-react';
import { Content } from '../data/content';
import { useState } from 'react';

interface ContentDetailProps {
  content: Content;
  onClose: () => void;
  onAddToList?: (content: Content) => void;
  isInList?: boolean;
}

export default function ContentDetail({ content, onClose, onAddToList, isInList }: ContentDetailProps) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlay = (sourceId: string) => {
    setSelectedSource(sourceId);
    setShowPlayer(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 my-8 md:my-16 bg-[#12121a] rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in">
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh]">
          <img
            src={content.backdrop}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-[#12121a]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12121a]/80 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/10"
          >
            <X size={20} />
          </button>

          {/* Content info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase">
                {content.type}
              </span>
              <span className="px-3 py-1 bg-white/10 text-white/90 text-xs font-medium rounded border border-white/20">
                {content.maturityRating}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold text-white">{content.rating}/10</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2">{content.title}</h1>
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <span>{content.year}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>{content.duration}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>{content.genre.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handlePlay(content.sources[0]?.id || '')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/20"
            >
              <Play size={20} fill="white" />
              Watch Now
            </button>
            {onAddToList && (
              <button
                onClick={() => onAddToList(content)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all ${
                  isInList 
                    ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                {isInList ? <Check size={18} /> : <Plus size={18} />}
                {isInList ? 'In My List' : 'Add to List'}
              </button>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-white/80 text-base leading-relaxed">{content.description}</p>
          </div>

          {/* Cast & Crew */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Cast</h3>
              <p className="text-white/80 text-sm">{content.cast.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Director</h3>
              <p className="text-white/80 text-sm">{content.director}</p>
            </div>
            {content.seasons && (
              <div>
                <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Seasons / Episodes</h3>
                <p className="text-white/80 text-sm">{content.seasons} Seasons • {content.episodes} Episodes</p>
              </div>
            )}
            <div>
              <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Genres</h3>
              <div className="flex flex-wrap gap-1">
                {content.genre.map((g, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70 text-xs">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sources Section */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={18} className="text-purple-400" />
              <h3 className="text-white text-lg font-bold">Streaming Sources & Providers</h3>
            </div>
            <p className="text-white/50 text-sm mb-4">
              Select a source below to start streaming. Each source may have different quality, pricing, and regional availability.
            </p>

            {/* Player Section */}
            {showPlayer && selectedSource && (
              <div className="mb-6 bg-black/50 rounded-xl border border-white/10 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor size={16} className="text-green-400" />
                      <span className="text-white text-sm font-medium">
                        Now streaming from: {content.sources.find(s => s.id === selectedSource)?.name}
                      </span>
                    </div>
                    <button onClick={() => setShowPlayer(false)} className="text-white/50 hover:text-white text-xs">
                      Close Player
                    </button>
                  </div>
                </div>
                <div className="aspect-video bg-black flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                      <Play size={24} className="text-white/60" fill="white" />
                    </div>
                    <p className="text-white/60 text-sm">Streaming from {content.sources.find(s => s.id === selectedSource)?.name}</p>
                    <p className="text-white/40 text-xs">Quality: {content.sources.find(s => s.id === selectedSource)?.quality}</p>
                    <div className="flex items-center gap-2 justify-center text-white/30 text-xs">
                      <Shield size={12} />
                      <span>Secure stream • DRM Protected</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Source Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.sources.map((source) => (
                <div
                  key={source.id}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer group ${
                    selectedSource === source.id
                      ? 'bg-purple-600/10 border-purple-500/50 shadow-lg shadow-purple-500/5'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                  onClick={() => handlePlay(source.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{source.logo}</div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">{source.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-white/50 text-xs">{source.quality}</span>
                          <span className="text-white/30">•</span>
                          <span className="text-white/50 text-xs">{source.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 rounded border border-green-500/20">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-[10px] font-medium">Available</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-3 text-white/40 text-xs">
                      <span className="flex items-center gap-1">
                        <Globe size={10} />
                        {source.region}
                      </span>
                      <span className="flex items-center gap-1">
                        <Monitor size={10} />
                        {source.quality}
                      </span>
                    </div>
                    <button className="flex items-center gap-1 text-purple-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={12} />
                      Play
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
            <p className="text-white/40 text-xs leading-relaxed">
              <strong className="text-white/60">Disclaimer:</strong> StreamVault aggregates content from multiple streaming providers. 
              Availability, pricing, and quality may vary by region and subscription tier. 
              Please ensure you have a valid subscription with the selected provider. 
              All content is streamed through official provider APIs with proper licensing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

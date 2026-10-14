import { X, Play, Star, Plus, Check, ExternalLink, Shield, Globe, Monitor, Wifi, Gift } from 'lucide-react';
import { Content, Source } from '../data/content';
import { useState } from 'react';

interface ContentDetailProps {
  content: Content;
  onClose: () => void;
  onAddToList?: (content: Content) => void;
  isInList?: boolean;
}

function getSourceTypeLabel(type: Source['type']) {
  switch (type) {
    case 'free-ad': return { label: 'Free (Ads)', color: 'text-green-400 bg-green-500/10 border-green-500/20' };
    case 'free-library': return { label: 'Free (Library Card)', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
    case 'free-public': return { label: 'Public Domain', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' };
    case 'free-tier': return { label: 'Free Tier', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    default: return { label: 'Free', color: 'text-green-400 bg-green-500/10 border-green-500/20' };
  }
}

export default function ContentDetail({ content, onClose, onAddToList, isInList }: ContentDetailProps) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlay = (sourceId: string) => {
    setSelectedSource(sourceId);
    setShowPlayer(true);
  };

  const currentSource = content.sources.find(s => s.id === selectedSource);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />
      
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

          {/* FREE badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full shadow-lg shadow-green-500/20">
              <Gift size={14} className="text-white" />
              <span className="text-white text-xs font-bold uppercase tracking-wide">100% Free</span>
            </div>
          </div>

          {/* Content info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded uppercase">
                {content.type}
              </span>
              <span className="px-3 py-1 bg-white/10 text-white/90 text-xs font-medium rounded border border-white/20">
                {content.maturityRating}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold text-white">{content.rating}/10</span>
              </div>
              <span className="px-3 py-1 bg-white/5 text-white/60 text-xs font-medium rounded border border-white/10">
                {content.sources.length} free sources
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2">{content.title}</h1>
            <div className="flex items-center gap-3 text-white/60 text-sm flex-wrap">
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
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/20"
            >
              <Play size={20} fill="white" />
              Watch Free
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

          {/* Free Sources Section */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Wifi size={18} className="text-green-400" />
              <h3 className="text-white text-lg font-bold">Free Streaming Sources</h3>
            </div>
            <p className="text-white/50 text-sm mb-4">
              All sources below are <span className="text-green-400 font-medium">100% free</span>. No subscription or credit card required. 
              Some may show ads or require a library card.
            </p>

            {/* Player Section */}
            {showPlayer && currentSource && (
              <div className="mb-6 bg-black/50 rounded-xl border border-green-500/20 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor size={16} className="text-green-400" />
                      <span className="text-white text-sm font-medium">
                        Streaming free from: {currentSource.logo} {currentSource.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getSourceTypeLabel(currentSource.type).color}`}>
                        {getSourceTypeLabel(currentSource.type).label}
                      </span>
                      <button onClick={() => setShowPlayer(false)} className="text-white/50 hover:text-white text-xs ml-2">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
                <div className="aspect-video bg-black flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                      <Play size={32} className="text-green-400" fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{content.title}</p>
                      <p className="text-green-400 text-sm mt-1">Now streaming free from {currentSource.name}</p>
                    </div>
                    <div className="flex items-center gap-4 justify-center text-white/40 text-xs">
                      <span className="flex items-center gap-1">
                        <Monitor size={12} />
                        {currentSource.quality}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe size={12} />
                        {currentSource.region}
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield size={12} />
                        Legal & Safe
                      </span>
                    </div>
                    {currentSource.url && (
                      <a 
                        href={currentSource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors mt-2"
                      >
                        <ExternalLink size={14} />
                        Open in {currentSource.name}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Source Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.sources.map((source) => {
                const typeInfo = getSourceTypeLabel(source.type);
                return (
                  <div
                    key={source.id}
                    className={`relative p-4 rounded-xl border transition-all cursor-pointer group ${
                      selectedSource === source.id
                        ? 'bg-green-600/10 border-green-500/50 shadow-lg shadow-green-500/5'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-green-500/30'
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
                            <span className="text-green-400 text-xs font-medium">{source.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 rounded border border-green-500/20">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-400 text-[10px] font-medium">Available</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
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
                      <button className="flex items-center gap-1 text-green-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={12} />
                        Watch Free
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-green-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-green-400 text-sm font-semibold mb-1">100% Free & Legal</p>
                <p className="text-white/50 text-xs leading-relaxed">
                  All streaming sources listed are completely free and legal. Sources may include ad-supported platforms, 
                  public domain content, or services accessible with a free library card. No credit card or paid subscription required. 
                  This app is for personal use only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

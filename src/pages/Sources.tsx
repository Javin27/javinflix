import { useState } from 'react';
import { Gift, Globe, Monitor, ExternalLink, Shield, Wifi, BookOpen, Landmark, Sparkles } from 'lucide-react';
import { sources, contentData, Source } from '../data/content';

export default function SourcesPage() {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredSources = filterType === 'all' 
    ? sources 
    : sources.filter(s => s.type === filterType);

  const getContentCount = (sourceId: string) => {
    return contentData.filter(c => c.sources.some(s => s.id === sourceId)).length;
  };

  const getTypeIcon = (type: Source['type']) => {
    switch (type) {
      case 'free-ad': return <Wifi size={16} className="text-green-400" />;
      case 'free-library': return <BookOpen size={16} className="text-blue-400" />;
      case 'free-public': return <Landmark size={16} className="text-purple-400" />;
      case 'free-tier': return <Sparkles size={16} className="text-amber-400" />;
      default: return <Gift size={16} className="text-green-400" />;
    }
  };

  const getTypeDescription = (type: Source['type']) => {
    switch (type) {
      case 'free-ad': return 'Free with occasional ads. No subscription needed.';
      case 'free-library': return 'Free with a valid library card. No ads.';
      case 'free-public': return 'Public domain content. Completely free, no restrictions.';
      case 'free-tier': return 'Free tier available. Premium features optional.';
      default: return 'Free to use.';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Gift size={28} className="text-green-400" />
            <h1 className="text-white text-3xl font-black">Free Streaming Sources</h1>
          </div>
          <p className="text-white/50 text-sm max-w-2xl">
            StreamVault aggregates content from {sources.length} free streaming platforms. 
            No subscriptions, no credit cards — just free movies and TV shows from legal sources.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-4">
            <div className="text-green-400 text-2xl font-black">{sources.length}</div>
            <div className="text-white/60 text-xs mt-1">Free Sources</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-xl p-4">
            <div className="text-blue-400 text-2xl font-black">{contentData.length}+</div>
            <div className="text-white/60 text-xs mt-1">Titles Available</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-xl p-4">
            <div className="text-purple-400 text-2xl font-black">$0</div>
            <div className="text-white/60 text-xs mt-1">Monthly Cost</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-4">
            <div className="text-amber-400 text-2xl font-black">100%</div>
            <div className="text-white/60 text-xs mt-1">Legal & Safe</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Sources', icon: <Globe size={14} /> },
              { id: 'free-ad', label: 'Free (Ads)', icon: <Wifi size={14} /> },
              { id: 'free-library', label: 'Free (Library)', icon: <BookOpen size={14} /> },
              { id: 'free-public', label: 'Public Domain', icon: <Landmark size={14} /> },
              { id: 'free-tier', label: 'Free Tier', icon: <Sparkles size={14} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterType === tab.id
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/20'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Source Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredSources.map((source) => {
            const contentCount = getContentCount(source.id);
            return (
              <div
                key={source.id}
                className="bg-white/[0.02] border border-white/10 rounded-xl p-5 hover:border-green-500/30 hover:bg-white/[0.04] transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{source.logo}</div>
                    <div>
                      <h3 className="text-white font-bold text-base">{source.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {getTypeIcon(source.type)}
                        <span className="text-white/50 text-xs">{getTypeDescription(source.type)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 rounded border border-green-500/20">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-[10px] font-medium">Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="flex items-center gap-1 text-white/40 text-[10px] mb-0.5">
                      <Monitor size={10} />
                      Quality
                    </div>
                    <div className="text-white text-xs font-medium">{source.quality}</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="flex items-center gap-1 text-white/40 text-[10px] mb-0.5">
                      <Globe size={10} />
                      Region
                    </div>
                    <div className="text-white text-xs font-medium">{source.region}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="text-white/50 text-xs">
                    <span className="text-green-400 font-semibold">{contentCount}</span> titles available
                  </div>
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-400 text-xs font-medium hover:text-green-300 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Visit <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
            <Shield size={20} className="text-green-400" />
            How StreamVault Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                <span className="text-green-400 font-bold">1</span>
              </div>
              <h3 className="text-white font-semibold text-sm">Browse Content</h3>
              <p className="text-white/50 text-xs leading-relaxed">
                Explore our curated collection of movies and TV shows available across multiple free streaming platforms.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                <span className="text-green-400 font-bold">2</span>
              </div>
              <h3 className="text-white font-semibold text-sm">Choose Your Source</h3>
              <p className="text-white/50 text-xs leading-relaxed">
                Select from available free sources. Each shows quality, region, and type (ad-supported, library, public domain, etc).
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                <span className="text-green-400 font-bold">3</span>
              </div>
              <h3 className="text-white font-semibold text-sm">Watch Free</h3>
              <p className="text-white/50 text-xs leading-relaxed">
                Get redirected to the source platform and enjoy your content — completely free, no credit card needed.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <p className="text-white/40 text-xs leading-relaxed">
            <strong className="text-white/60">Personal Use Disclaimer:</strong> StreamVault is a personal-use aggregation tool that helps you discover 
            free, legal streaming content. All content is sourced from legitimate free streaming platforms. 
            We do not host, store, or distribute any copyrighted content. Availability may vary by region. 
            Some sources may require a free library card or account registration.
          </p>
        </div>
      </div>
    </div>
  );
}

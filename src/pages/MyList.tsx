import { useState } from 'react';
import { Bookmark, Trash2, Gift } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import ContentDetail from '../components/ContentDetail';
import { Content, contentData } from '../data/content';

interface MyListPageProps {
  myList: string[];
  onAddToList: (content: Content) => void;
  onRemoveFromList: (id: string) => void;
}

export default function MyListPage({ myList, onAddToList, onRemoveFromList }: MyListPageProps) {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const listItems = contentData.filter(c => myList.includes(c.id));

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark size={28} className="text-green-400" />
            <h1 className="text-white text-3xl font-black">My Free List</h1>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-medium">
              <Gift size={10} /> All Free
            </span>
          </div>
          <p className="text-white/50 text-sm">
            {listItems.length} {listItems.length === 1 ? 'title' : 'titles'} saved — all available from free streaming sources
          </p>
        </div>

        {listItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {listItems.map((item) => (
              <div key={item.id} className="relative group">
                <ContentCard
                  content={item}
                  onSelect={setSelectedContent}
                  isInList={true}
                />
                <button
                  onClick={() => onRemoveFromList(item.id)}
                  className="absolute top-2 right-2 z-10 w-8 h-8 bg-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 size={14} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-white text-xl font-semibold mb-2">Your free list is empty</h3>
            <p className="text-white/50 max-w-md mx-auto">
              Browse free movies and series and click the + button to save them to your personal collection. All content is 100% free!
            </p>
          </div>
        )}
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

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Content } from '../data/content';
import ContentCard from './ContentCard';

interface ContentRowProps {
  title: string;
  content: Content[];
  onSelect: (content: Content) => void;
  onAddToList?: (content: Content) => void;
  myList?: string[];
  size?: 'normal' | 'large';
  icon?: string;
}

export default function ContentRow({ title, content, onSelect, onAddToList, myList = [], size = 'normal', icon }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  if (content.length === 0) return null;

  return (
    <div className="relative py-4 md:py-6 group/row">
      {/* Section Title */}
      <div className="px-4 md:px-8 mb-3 flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <h2 className="text-white text-lg md:text-xl font-bold">{title}</h2>
        <span className="text-white/40 text-sm ml-2">({content.length})</span>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 md:w-16 bg-gradient-to-r from-[#0a0a0f] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>
        )}

        {/* Content */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {content.map((item) => (
            <ContentCard
              key={item.id}
              content={item}
              onSelect={onSelect}
              onAddToList={onAddToList}
              isInList={myList.includes(item.id)}
              size={size}
            />
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 md:w-16 bg-gradient-to-l from-[#0a0a0f] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronRight size={32} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
}

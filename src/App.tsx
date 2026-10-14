import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import MoviesPage from './pages/Movies';
import SeriesPage from './pages/Series';
import MyListPage from './pages/MyList';
import SourcesPage from './pages/Sources';
import { Content } from './data/content';

function App() {
  const [myList, setMyList] = useState<string[]>(() => {
    const saved = localStorage.getItem('streamvault-mylist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('streamvault-mylist', JSON.stringify(myList));
  }, [myList]);

  const handleAddToList = (content: Content) => {
    setMyList(prev => {
      if (prev.includes(content.id)) {
        return prev.filter(id => id !== content.id);
      }
      return [...prev, content.id];
    });
  };

  const handleRemoveFromList = (id: string) => {
    setMyList(prev => prev.filter(itemId => itemId !== id));
  };

  const handleSearch = (_query: string) => {
    // Navigation handled by Navbar
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route 
            path="/" 
            element={<HomePage myList={myList} onAddToList={handleAddToList} />} 
          />
          <Route 
            path="/search" 
            element={<SearchPage myList={myList} onAddToList={handleAddToList} />} 
          />
          <Route 
            path="/movies" 
            element={<MoviesPage myList={myList} onAddToList={handleAddToList} />} 
          />
          <Route 
            path="/series" 
            element={<SeriesPage myList={myList} onAddToList={handleAddToList} />} 
          />
          <Route 
            path="/sources" 
            element={<SourcesPage />} 
          />
          <Route 
            path="/mylist" 
            element={
              <MyListPage 
                myList={myList} 
                onAddToList={handleAddToList}
                onRemoveFromList={handleRemoveFromList}
              />
            } 
          />
        </Routes>

        {/* Footer */}
        <footer className="bg-[#0a0a0f] border-t border-white/5 py-12 px-4 md:px-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-white/80 font-semibold text-sm mb-3">Navigation</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-white/40 text-xs hover:text-white/70 transition-colors">Home</a></li>
                  <li><a href="/movies" className="text-white/40 text-xs hover:text-white/70 transition-colors">Movies</a></li>
                  <li><a href="/series" className="text-white/40 text-xs hover:text-white/70 transition-colors">TV Series</a></li>
                  <li><a href="/sources" className="text-white/40 text-xs hover:text-white/70 transition-colors">Free Sources</a></li>
                  <li><a href="/mylist" className="text-white/40 text-xs hover:text-white/70 transition-colors">My List</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white/80 font-semibold text-sm mb-3">Ad-Supported (Free)</h3>
                <ul className="space-y-2">
                  <li><span className="text-white/40 text-xs">🟡 Tubi</span></li>
                  <li><span className="text-white/40 text-xs">🌐 Pluto TV</span></li>
                  <li><span className="text-white/40 text-xs">🟢 Amazon Freevee</span></li>
                  <li><span className="text-white/40 text-xs">🔶 Crackle</span></li>
                  <li><span className="text-white/40 text-xs">🍿 PopcornFlix</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white/80 font-semibold text-sm mb-3">More Free Sources</h3>
                <ul className="space-y-2">
                  <li><span className="text-white/40 text-xs">▶️ YouTube Movies</span></li>
                  <li><span className="text-white/40 text-xs">🏛️ Internet Archive</span></li>
                  <li><span className="text-white/40 text-xs">📚 Kanopy (Library)</span></li>
                  <li><span className="text-white/40 text-xs">📖 Hoopla (Library)</span></li>
                  <li><span className="text-white/40 text-xs">🟠 Plex</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white/80 font-semibold text-sm mb-3">About</h3>
                <ul className="space-y-2">
                  <li><span className="text-white/40 text-xs">StreamVault is a free streaming aggregator for personal use.</span></li>
                  <li><span className="text-white/40 text-xs">All sources are 100% free and legal.</span></li>
                  <li><span className="text-white/40 text-xs">No subscription or credit card required.</span></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-xs">SV</span>
                </div>
                <span className="text-white/60 text-sm font-semibold">StreamVault</span>
                <span className="text-green-400/60 text-[10px] font-medium">FREE</span>
              </div>
              <p className="text-white/30 text-xs text-center">
                © 2024 StreamVault • Free Streaming Hub for Personal Use • All content from licensed free sources
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu, X, Film, Tv } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 via-black/80 to-transparent backdrop-blur-sm">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-8">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-white font-black text-lg">SV</span>
              </div>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              Stream<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">Vault</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white/90 hover:text-white text-sm font-medium transition-colors">Home</Link>
            <Link to="/movies" className="text-white/70 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              <Film size={14} /> Movies
            </Link>
            <Link to="/series" className="text-white/70 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              <Tv size={14} /> Series
            </Link>
            <Link to="/mylist" className="text-white/70 hover:text-white text-sm font-medium transition-colors">My List</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className={`flex items-center transition-all duration-300 ${searchOpen ? 'w-64 bg-black/80 border border-white/20 rounded-full' : ''}`}>
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Titles, genres, people..."
                    className="bg-transparent text-white text-sm px-4 py-2 w-full outline-none placeholder-white/50"
                    autoFocus
                  />
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="px-3">
                    <X size={16} className="text-white/70" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="p-2 text-white/80 hover:text-white transition-colors">
                  <Search size={20} />
                </button>
              )}
            </div>

            <button className="p-2 text-white/80 hover:text-white transition-colors hidden md:block">
              <Bell size={20} />
            </button>
            
            <button className="p-2 text-white/80 hover:text-white transition-colors">
              <User size={20} />
            </button>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 text-white/80 hover:text-white transition-colors md:hidden"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-2 pt-4">
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-white/90 hover:text-white text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/movies" className="text-white/70 hover:text-white text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Movies</Link>
              <Link to="/series" className="text-white/70 hover:text-white text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Series</Link>
              <Link to="/mylist" className="text-white/70 hover:text-white text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>My List</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

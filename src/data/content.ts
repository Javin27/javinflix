export interface Source {
  id: string;
  name: string;
  logo: string;
  quality: string;
  price: string;
  available: boolean;
  region: string;
  type: 'free-ad' | 'free-library' | 'free-public' | 'free-tier';
  url?: string;
}

export interface Content {
  id: string;
  title: string;
  type: 'movie' | 'series';
  genre: string[];
  year: number;
  rating: number;
  duration: string;
  description: string;
  poster: string;
  backdrop: string;
  maturityRating: string;
  cast: string[];
  director: string;
  sources: Source[];
  featured?: boolean;
  trending?: boolean;
  seasons?: number;
  episodes?: number;
}

// === FREE STREAMING SOURCES ===
export const sources: Source[] = [
  { id: 'tubi', name: 'Tubi', logo: '🟡', quality: '1080p HD', price: 'Free (Ads)', available: true, region: 'US/CA/UK/AU/MX', type: 'free-ad', url: 'https://tubitv.com' },
  { id: 'pluto', name: 'Pluto TV', logo: '🌐', quality: '1080p HD', price: 'Free (Ads)', available: true, region: 'US/UK/DE/BR', type: 'free-ad', url: 'https://pluto.tv' },
  { id: 'freevee', name: 'Amazon Freevee', logo: '🟢', quality: '1080p HD', price: 'Free (Ads)', available: true, region: 'US/UK/DE', type: 'free-ad', url: 'https://www.amazon.com/gp/video/storefront' },
  { id: 'crackle', name: 'Crackle', logo: '🔶', quality: '720p', price: 'Free (Ads)', available: true, region: 'US', type: 'free-ad', url: 'https://www.crackle.com' },
  { id: 'popcorn', name: 'PopcornFlix', logo: '🍿', quality: '720p', price: 'Free (Ads)', available: true, region: 'US/CA', type: 'free-ad', url: 'https://www.popcornflix.com' },
  { id: 'youtube', name: 'YouTube Movies', logo: '▶️', quality: '1080p HD', price: 'Free (Ads)', available: true, region: 'Global', type: 'free-ad', url: 'https://www.youtube.com/feed/storefront' },
  { id: 'archive', name: 'Internet Archive', logo: '🏛️', quality: 'Varies', price: '100% Free', available: true, region: 'Global', type: 'free-public', url: 'https://archive.org' },
  { id: 'kanopy', name: 'Kanopy', logo: '📚', quality: '1080p HD', price: 'Free (Library)', available: true, region: 'US/AU', type: 'free-library', url: 'https://www.kanopy.com' },
  { id: 'hoopla', name: 'Hoopla', logo: '📖', quality: '1080p HD', price: 'Free (Library)', available: true, region: 'US/CA', type: 'free-library', url: 'https://www.hoopladigital.com' },
  { id: 'plex', name: 'Plex', logo: '🟠', quality: '1080p HD', price: 'Free (Ads)', available: true, region: 'Global', type: 'free-tier', url: 'https://www.plex.tv' },
  { id: 'roku', name: 'The Roku Channel', logo: '🟣', quality: '1080p HD', price: 'Free (Ads)', available: true, region: 'US/UK/CA/MX', type: 'free-ad', url: 'https://therokuchannel.roku.com' },
  { id: 'vudu', name: 'Vudu (Free)', logo: '🔵', quality: '1080p HD', price: 'Free (Ads)', available: true, region: 'US', type: 'free-ad', url: 'https://www.vudu.com' },
  { id: 'crunchyroll', name: 'Crunchyroll', logo: '🟧', quality: '1080p', price: 'Free (Ads)', available: true, region: 'Global', type: 'free-tier', url: 'https://www.crunchyroll.com' },
  { id: 'peacock-free', name: 'Peacock (Free)', logo: '🦚', quality: '720p', price: 'Free (Ads)', available: true, region: 'US', type: 'free-tier', url: 'https://www.peacocktv.com' },
  { id: 'pandora', name: 'Filmzie', logo: '🎬', quality: '1080p HD', price: 'Free (Ads)', available: true, region: 'US/UK', type: 'free-ad', url: 'https://www.filmzie.com' },
];

export const contentData: Content[] = [
  {
    id: '1',
    title: 'The Terminator',
    type: 'movie',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    year: 1984,
    rating: 8.1,
    duration: '1h 47min',
    description: 'A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity\'s future salvation.',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
    maturityRating: 'R',
    cast: ['Arnold Schwarzenegger', 'Michael Biehn', 'Linda Hamilton'],
    director: 'James Cameron',
    sources: [sources[0], sources[1], sources[3], sources[5], sources[9]],
    featured: true,
    trending: true,
  },
  {
    id: '2',
    title: 'Night of the Living Dead',
    type: 'movie',
    genre: ['Horror', 'Classic'],
    year: 1968,
    rating: 7.9,
    duration: '1h 36min',
    description: 'A ragtag group of Pennsylvanians barricade themselves in an old farmhouse to remain safe from a flesh-eating group of undead cannibals. A public domain classic.',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop',
    maturityRating: 'NR',
    cast: ['Duane Jones', "Judith O'Dea", 'Karl Hardman'],
    director: 'George A. Romero',
    sources: [sources[6], sources[0], sources[9]],
    trending: true,
  },
  {
    id: '3',
    title: 'Charade',
    type: 'movie',
    genre: ['Comedy', 'Mystery', 'Thriller'],
    year: 1963,
    rating: 7.9,
    duration: '1h 53min',
    description: 'Romance and suspense ensue in Paris as a woman becomes pursued by three men over her murdered husband\'s missing fortune. A beloved public domain classic.',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop',
    maturityRating: 'NR',
    cast: ['Cary Grant', 'Audrey Hepburn', 'Walter Matthau'],
    director: 'Stanley Donen',
    sources: [sources[6], sources[0], sources[5]],
    featured: true,
  },
  {
    id: '4',
    title: 'His Girl Friday',
    type: 'movie',
    genre: ['Comedy', 'Classic', 'Romance'],
    year: 1940,
    rating: 7.9,
    duration: '1h 32min',
    description: 'A newspaper editor uses every trick in the book to keep his ace reporter ex-wife from remarrying. A screwball comedy masterpiece available for free.',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1920&h=1080&fit=crop',
    maturityRating: 'NR',
    cast: ['Cary Grant', 'Rosalind Russell', 'Ralph Bellamy'],
    director: 'Howard Hawks',
    sources: [sources[6], sources[0], sources[9], sources[5]],
    trending: true,
  },
  {
    id: '5',
    title: 'McLintock!',
    type: 'movie',
    genre: ['Comedy', 'Western'],
    year: 1963,
    rating: 7.2,
    duration: '2h 7min',
    description: 'Ageing rancher George Washington McLintock faces a series of troubles including a demanding daughter and a estranged wife who wants a divorce.',
    poster: 'https://images.unsplash.com/photo-1500964757637-9e000c8c915e?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1920&h=1080&fit=crop',
    maturityRating: 'NR',
    cast: ['John Wayne', 'Maureen O\'Hara', 'Patrick Wayne'],
    director: 'Andrew V. McLaglen',
    sources: [sources[6], sources[1], sources[3], sources[5]],
  },
  {
    id: '6',
    title: 'Plan 9 from Outer Space',
    type: 'movie',
    genre: ['Sci-Fi', 'Horror', 'Cult'],
    year: 1957,
    rating: 5.7,
    duration: '1h 19min',
    description: 'Evil aliens attack Earth with an undead army, in what is often called the worst movie ever made — and a beloved cult classic available completely free.',
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop',
    maturityRating: 'NR',
    cast: ['Gregory Walcott', 'Mona McKinnon', 'Duke Moore'],
    director: 'Ed Wood',
    sources: [sources[6], sources[0], sources[9]],
    trending: true,
  },
  {
    id: '7',
    title: 'Doom Patrol',
    type: 'series',
    genre: ['Action', 'Comedy', 'Sci-Fi'],
    year: 2019,
    rating: 7.9,
    duration: '4 Seasons',
    description: 'A group of troubled superhumans who have been ostracized by society band together to fight evil and find purpose. Available free with ads on select platforms.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1920&h=1080&fit=crop',
    maturityRating: 'TV-MA',
    cast: ['Diane Guerrero', 'April Bowlby', 'Matt Bomer', 'Timothy Dalton'],
    director: 'Jeremy Carver',
    sources: [sources[0], sources[1], sources[2], sources[9]],
    trending: true,
    seasons: 4,
    episodes: 49,
  },
  {
    id: '8',
    title: 'Unsolved Mysteries',
    type: 'series',
    genre: ['Documentary', 'Crime', 'Mystery'],
    year: 1987,
    rating: 7.6,
    duration: '15 Seasons',
    description: 'The classic paranormal and crime anthology series that captivated audiences for decades. Now available free on ad-supported platforms.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop',
    maturityRating: 'TV-PG',
    cast: ['Robert Stack', 'Dennis Farina', 'Karl Malden'],
    director: 'John Cosgrove',
    sources: [sources[0], sources[1], sources[3], sources[9]],
    seasons: 15,
    episodes: 280,
  },
  {
    id: '9',
    title: 'The General',
    type: 'movie',
    genre: ['Action', 'Comedy', 'Classic'],
    year: 1926,
    rating: 8.1,
    duration: '1h 7min',
    description: 'After being rejected by the Confederate military, Johnnie must uncovers a spy plot and single-handedly rescue his girlfriend. A silent film masterpiece.',
    poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop',
    maturityRating: 'NR',
    cast: ['Buster Keaton', 'Marion Mack', 'Glen Cavender'],
    director: 'Buster Keaton',
    sources: [sources[6], sources[0], sources[5], sources[9]],
    featured: true,
  },
  {
    id: '10',
    title: 'Dragon Ball Z',
    type: 'series',
    genre: ['Animation', 'Action', 'Adventure'],
    year: 1989,
    rating: 8.8,
    duration: '9 Seasons',
    description: 'Goku and his companions defend the Earth against villains ranging from aliens, androids, and other supernatural beings. Free episodes available on ad-supported tiers.',
    poster: 'https://images.unsplash.com/photo-1607604276583-3b5e78e6a8e8?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop',
    maturityRating: 'TV-PG',
    cast: ['Masako Nozawa', 'Ryo Horikawa', 'Toshio Furukawa'],
    director: 'Daisuke Nishio',
    sources: [sources[0], sources[12], sources[9]],
    trending: true,
    seasons: 9,
    episodes: 291,
  },
  {
    id: '11',
    title: 'Nosferatu',
    type: 'movie',
    genre: ['Horror', 'Classic'],
    year: 1922,
    rating: 7.9,
    duration: '1h 34min',
    description: 'Vampire Count Orlok expresses interest in a new residence and real estate agent Hutter\'s wife. A landmark of silent horror cinema, now in the public domain.',
    poster: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1920&h=1080&fit=crop',
    maturityRating: 'NR',
    cast: ['Max Schreck', 'Gustav von Wangenheim', 'Greta Schröder'],
    director: 'F.W. Murnau',
    sources: [sources[6], sources[0], sources[5], sources[9]],
    trending: true,
  },
  {
    id: '12',
    title: 'The Phantom of the Opera',
    type: 'movie',
    genre: ['Horror', 'Drama', 'Classic'],
    year: 1925,
    rating: 7.6,
    duration: '1h 33min',
    description: 'A mad, disfigured composer haunts the Paris Opera House, frightening a young soprano. Lon Chaney\'s iconic performance in this public domain masterpiece.',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&h=1080&fit=crop',
    maturityRating: 'NR',
    cast: ['Lon Chaney', 'Mary Philbin', 'Norman Kerry'],
    director: 'Rupert Julian',
    sources: [sources[6], sources[0], sources[9], sources[5]],
  },
  {
    id: '13',
    title: 'Metropolis',
    type: 'movie',
    genre: ['Sci-Fi', 'Drama', 'Classic'],
    year: 1927,
    rating: 8.3,
    duration: '2h 33min',
    description: 'In a futuristic city sharply divided between the working class and the city planners, the son of the city\'s mastermind falls in love with a working class prophet.',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop',
    maturityRating: 'NR',
    cast: ['Alfred Abel', 'Gustav Fröhlich', 'Brigitte Helm'],
    director: 'Fritz Lang',
    sources: [sources[6], sources[0], sources[5], sources[9]],
    featured: true,
    trending: true,
  },
  {
    id: '14',
    title: 'The Little Rascals',
    type: 'series',
    genre: ['Comedy', 'Family', 'Classic'],
    year: 1922,
    rating: 7.8,
    duration: '22 Seasons',
    description: 'The classic comedy shorts featuring a group of neighborhood children who form a club and go on various adventures. Timeless family entertainment.',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop',
    maturityRating: 'G',
    cast: ['George McFarland', 'Billie Thomas', 'Carl Switzer'],
    director: 'Robert F. McGowan',
    sources: [sources[6], sources[0], sources[1], sources[9]],
    seasons: 22,
    episodes: 220,
  },
  {
    id: '15',
    title: 'Popeye the Sailor',
    type: 'series',
    genre: ['Animation', 'Comedy', 'Family'],
    year: 1933,
    rating: 7.3,
    duration: '15 Seasons',
    description: 'The beloved animated adventures of Popeye the Sailor Man as he battles Bluto and woos Olive Oyl. Classic cartoons available for free.',
    poster: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=1920&h=1080&fit=crop',
    maturityRating: 'G',
    cast: ['Jack Mercer', 'Mae Questel', 'William Costello'],
    director: 'Dave Fleischer',
    sources: [sources[6], sources[0], sources[1], sources[5]],
    seasons: 15,
    episodes: 231,
  },
  {
    id: '16',
    title: 'D.O.A.',
    type: 'movie',
    genre: ['Film Noir', 'Mystery', 'Thriller'],
    year: 1950,
    rating: 7.2,
    duration: '1h 23min',
    description: 'A man has been poisoned and has only a few days to live. He uses his remaining time to find out who killed him and why. A quintessential film noir.',
    poster: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop',
    maturityRating: 'NR',
    cast: ['Edmond O\'Brien', 'Pamela Britton', 'Luther Adler'],
    director: 'Rudolph Maté',
    sources: [sources[6], sources[0], sources[3], sources[9]],
  },
  {
    id: '17',
    title: 'The Hitchhiker',
    type: 'series',
    genre: ['Drama', 'Thriller', 'Anthology'],
    year: 1985,
    rating: 7.4,
    duration: '6 Seasons',
    description: 'An anthology series featuring different stories each episode, all connected by a mysterious hitchhiker who appears in each tale. Dark, twisty storytelling.',
    poster: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
    maturityRating: 'TV-MA',
    cast: ['Page Fletcher', 'Various Guest Stars'],
    director: 'Various',
    sources: [sources[0], sources[1], sources[3], sources[9]],
    seasons: 6,
    episodes: 93,
  },
  {
    id: '18',
    title: 'My Favorite Martian',
    type: 'series',
    genre: ['Comedy', 'Sci-Fi', 'Family'],
    year: 1963,
    rating: 7.1,
    duration: '3 Seasons',
    description: 'When a Martian crash-lands on Earth, a newspaper reporter befriends him and hides his identity while the alien tries to repair his spacecraft.',
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1920&h=1080&fit=crop',
    maturityRating: 'TV-G',
    cast: ['Ray Walston', 'Bill Bixby', 'Pamela Britton'],
    director: 'John L. Greene',
    sources: [sources[6], sources[0], sources[1], sources[9]],
    seasons: 3,
    episodes: 104,
  },
];

export const genres = [
  'All', 'Action', 'Adventure', 'Animation', 'Classic', 'Comedy', 'Crime', 
  'Cult', 'Documentary', 'Drama', 'Family', 'Film Noir', 'Horror', 'Mystery', 
  'Romance', 'Sci-Fi', 'Thriller', 'Western'
];

export const getFeaturedContent = () => contentData.filter(c => c.featured);
export const getTrendingContent = () => contentData.filter(c => c.trending);
export const getMovies = () => contentData.filter(c => c.type === 'movie');
export const getSeries = () => contentData.filter(c => c.type === 'series');
export const getContentByGenre = (genre: string) => {
  if (genre === 'All') return contentData;
  return contentData.filter(c => c.genre.includes(genre));
};
export const searchContent = (query: string) => {
  const lower = query.toLowerCase();
  return contentData.filter(c => 
    c.title.toLowerCase().includes(lower) || 
    c.genre.some(g => g.toLowerCase().includes(lower)) ||
    c.cast.some(a => a.toLowerCase().includes(lower)) ||
    c.director.toLowerCase().includes(lower)
  );
};
export const getContentBySourceType = (type: string) => {
  return contentData.filter(c => c.sources.some(s => s.type === type));
};

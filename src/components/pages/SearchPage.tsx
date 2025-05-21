import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SongCard from '../shared/SongCard';
import { songs } from '../../data/songs';
import { Song } from '../../types';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const results = songs.filter(song => 
      song.title.toLowerCase().includes(term) || 
      song.artist.toLowerCase().includes(term) || 
      song.album.toLowerCase().includes(term)
    );
    
    setSearchResults(results);
  }, [searchTerm]);
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      
      <div className="relative mb-10">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for songs, artists, or albums"
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {searchResults.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {searchResults.map(song => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </div>
      ) : searchTerm.trim() !== '' ? (
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg">No results found for "{searchTerm}"</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Browse All</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {songs.map(song => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
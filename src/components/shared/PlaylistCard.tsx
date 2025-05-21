import React from 'react';
import { Play } from 'lucide-react';
import { Playlist } from '../../types';
import { songs } from '../../data/songs';
import { usePlayer } from '../../context/PlayerContext';

interface PlaylistCardProps {
  playlist: Playlist;
  onClick: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onClick }) => {
  const { playSong } = usePlayer();
  
  const handlePlayAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (playlist.songs.length > 0) {
      // Find the first song of the playlist
      const firstSongId = playlist.songs[0];
      const songToPlay = songs.find(song => song.id === firstSongId);
      
      if (songToPlay) {
        playSong(songToPlay);
      }
    }
  };
  
  return (
    <div 
      className="group relative rounded-md overflow-hidden bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="relative mb-3 aspect-square overflow-hidden rounded-md">
          <img 
            src={playlist.cover} 
            alt={playlist.name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePlayAll}
              className="h-12 w-12 flex items-center justify-center bg-purple-600 rounded-full hover:bg-purple-700 transition-colors shadow-xl transform hover:scale-105 transition-transform"
            >
              <Play size={20} className="ml-1" />
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-white">{playlist.name}</h3>
          <p className="text-sm text-gray-400 line-clamp-2 mt-1">{playlist.description}</p>
          <p className="text-xs text-gray-500 mt-2">{playlist.songs.length} songs</p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
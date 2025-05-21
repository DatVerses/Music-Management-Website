import React from 'react';
import { Play, MoreHorizontal, Heart } from 'lucide-react';
import { Song } from '../../types';
import { usePlayer } from '../../context/PlayerContext';
import { formatTime } from '../../utils/formatTime';

interface SongCardProps {
  song: Song;
  index?: number;
  showIndex?: boolean;
  compact?: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ song, index, showIndex = false, compact = false }) => {
  const { currentSong, isPlaying, playSong, pauseSong } = usePlayer();
  
  const isActive = currentSong?.id === song.id;
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActive && isPlaying) {
      pauseSong();
    } else {
      playSong(song);
    }
  };

  if (compact) {
    return (
      <div 
        className={`flex items-center p-2 rounded-md transition-colors ${
          isActive ? 'bg-purple-900/30' : 'hover:bg-gray-800/70'
        }`}
      >
        {showIndex && (
          <div className="w-8 text-center text-gray-400 text-sm">
            {index! + 1}
          </div>
        )}
        <div className="relative flex-shrink-0 h-10 w-10 mr-3">
          <img 
            src={song.cover} 
            alt={song.title} 
            className="h-full w-full object-cover rounded"
          />
          <button
            onClick={handlePlay}
            className={`absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity rounded ${
              isActive && isPlaying ? 'opacity-100' : ''
            }`}
          >
            {isActive && isPlaying ? (
              <Pause size={16} className="text-white" />
            ) : (
              <Play size={16} className="text-white" />
            )}
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <p className={`truncate text-sm ${isActive ? 'text-purple-500' : 'text-white'}`}>
            {song.title}
          </p>
          <p className="truncate text-xs text-gray-400">{song.artist}</p>
        </div>
        <div className="text-xs text-gray-400 px-3">
          {formatTime(song.duration)}
        </div>
        <button className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700">
          <Heart size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="group relative rounded-md overflow-hidden bg-gray-800/50 hover:bg-gray-800 transition-colors">
      <div className="p-4">
        <div className="relative mb-3 aspect-square overflow-hidden rounded-md">
          <img 
            src={song.cover} 
            alt={song.title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePlay}
              className="h-12 w-12 flex items-center justify-center bg-purple-600 rounded-full hover:bg-purple-700 transition-colors shadow-xl transform hover:scale-105 transition-transform"
            >
              {isActive && isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-1" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <h3 className={`font-medium truncate ${isActive ? 'text-purple-500' : 'text-white'}`}>
              {song.title}
            </h3>
            <p className="text-sm text-gray-400 truncate">{song.artist}</p>
          </div>
          <div className="flex">
            <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-700">
              <Heart size={16} />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define Pause icon component since it's not available in lucide-react
const Pause: React.FC<{ size: number, className?: string }> = ({ size, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

export default SongCard;
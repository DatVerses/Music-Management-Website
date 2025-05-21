import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Heart, RefreshCw, Shuffle } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { formatTime } from '../../utils/formatTime';

const MusicPlayer: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    volume, 
    progress, 
    playSong, 
    pauseSong, 
    nextSong, 
    prevSong, 
    setVolume, 
    setProgress 
  } = usePlayer();

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const volumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} />;
    if (volume < 0.5) return <Volume1 size={16} />;
    return <Volume2 size={16} />;
  };

  if (!currentSong) {
    return (
      <div className="h-20 bg-gray-800 border-t border-gray-700 flex items-center justify-center text-gray-400">
        Select a song to start playing
      </div>
    );
  }

  const currentTime = formatTime(Math.floor(currentSong.duration * (progress / 100)));
  const totalDuration = formatTime(currentSong.duration);

  return (
    <div className="h-20 bg-gray-800 border-t border-gray-700 p-3 flex items-center text-white">
      <div className="flex items-center w-1/4">
        <img 
          src={currentSong.cover} 
          alt={currentSong.title} 
          className="h-12 w-12 rounded object-cover shadow-md"
        />
        <div className="ml-3 min-w-0">
          <p className="text-sm font-medium truncate">{currentSong.title}</p>
          <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
        </div>
        <button className="ml-4 text-gray-400 hover:text-red-500 transition-colors">
          <Heart size={16} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Shuffle size={16} />
          </button>
          <button 
            onClick={prevSong}
            className="p-1 text-gray-300 hover:text-white transition-colors"
          >
            <SkipBack size={18} />
          </button>
          <button 
            onClick={isPlaying ? pauseSong : () => playSong(currentSong)}
            className="p-1.5 bg-white text-black rounded-full hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button 
            onClick={nextSong}
            className="p-1 text-gray-300 hover:text-white transition-colors"
          >
            <SkipForward size={18} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="w-full flex items-center space-x-2 mt-2">
          <span className="text-xs text-gray-400 w-10 text-right">{currentTime}</span>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #9333ea ${progress}%, #374151 ${progress}%)`,
              }}
            />
          </div>
          <span className="text-xs text-gray-400 w-10">{totalDuration}</span>
        </div>
      </div>

      <div className="w-1/4 flex justify-end items-center space-x-2">
        <button className="text-gray-400 hover:text-white transition-colors">
          {volumeIcon()}
        </button>
        <div className="w-24 relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #9333ea ${volume * 100}%, #374151 ${volume * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Song } from '../types';
import { songs } from '../data/songs';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  queue: Song[];
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [progress, setProgressState] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgressState(0);
    
    // Update queue with next 5 songs after the current one
    const songIndex = songs.findIndex(s => s.id === song.id);
    const nextSongs = [...songs.slice(songIndex + 1), ...songs.slice(0, songIndex)].slice(0, 5);
    setQueue(nextSongs);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const nextSong = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      const newQueue = queue.slice(1);
      
      setCurrentSong(nextSong);
      setProgressState(0);
      
      // Add a new song to the end of the queue
      const currentIndex = songs.findIndex(s => s.id === nextSong.id);
      const newSongForQueue = songs[(currentIndex + 5) % songs.length];
      
      setQueue([...newQueue, newSongForQueue]);
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(s => s.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      const prevSong = songs[prevIndex];
      
      setCurrentSong(prevSong);
      setProgressState(0);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const setProgress = (newProgress: number) => {
    setProgressState(newProgress);
  };

  // Auto increment progress for demo purposes
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setProgressState(prev => {
          if (prev >= 100) {
            nextSong();
            return 0;
          }
          return prev + (100 / (currentSong.duration / 10));
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        progress,
        playSong,
        pauseSong,
        nextSong,
        prevSong,
        setVolume,
        setProgress,
        queue
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
import React from 'react';
import { Clock, Play, Heart, MoreHorizontal, Download, Share2 } from 'lucide-react';
import { Playlist } from '../../types';
import { songs } from '../../data/songs';
import { usePlayer } from '../../context/PlayerContext';
import SongCard from '../shared/SongCard';

interface PlaylistPageProps {
  playlist: Playlist;
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({ playlist }) => {
  const { playSong } = usePlayer();
  
  const playlistSongs = playlist.songs
    .map(id => songs.find(song => song.id === id))
    .filter(Boolean);
    
  const totalDuration = playlistSongs.reduce((total, song) => total + (song?.duration || 0), 0);
  
  const formatTotalDuration = () => {
    const minutes = Math.floor(totalDuration / 60);
    return `${minutes} min`;
  };
  
  const handlePlayAll = () => {
    if (playlistSongs.length > 0 && playlistSongs[0]) {
      playSong(playlistSongs[0]);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-end p-8 bg-gradient-to-b from-purple-800/60 to-gray-900">
        <div className="mr-6 flex-shrink-0">
          <img 
            src={playlist.cover} 
            alt={playlist.name} 
            className="h-48 w-48 object-cover shadow-lg rounded-md"
          />
        </div>
        <div>
          <p className="text-sm font-medium uppercase mb-2">Playlist</p>
          <h1 className="text-5xl font-bold mb-4">{playlist.name}</h1>
          <p className="text-gray-300 mb-4">{playlist.description}</p>
          <div className="flex items-center text-sm text-gray-400">
            <span>{playlist.songs.length} songs</span>
            <span className="mx-1">•</span>
            <span>{formatTotalDuration()}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <button 
            onClick={handlePlayAll}
            className="flex items-center justify-center h-12 w-12 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
          >
            <Play size={20} className="ml-1" />
          </button>
          
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart size={24} />
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <Download size={20} />
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <Share2 size={20} />
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors ml-auto">
            <MoreHorizontal size={24} />
          </button>
        </div>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
              <th className="pb-2 w-12 font-medium">#</th>
              <th className="pb-2 font-medium">Title</th>
              <th className="pb-2 font-medium">Album</th>
              <th className="pb-2 font-medium text-right pr-8">
                <Clock size={16} />
              </th>
            </tr>
          </thead>
          <tbody>
            {playlistSongs.map((song, index) => song && (
              <tr 
                key={song.id}
                className="hover:bg-gray-800/50 group"
              >
                <td className="py-3 px-2 text-gray-400">{index + 1}</td>
                <td>
                  <div className="flex items-center">
                    <img 
                      src={song.cover} 
                      alt={song.title} 
                      className="h-10 w-10 object-cover rounded mr-3"
                    />
                    <div>
                      <p className="font-medium text-white">{song.title}</p>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                </td>
                <td className="text-gray-400">{song.album}</td>
                <td className="text-right text-gray-400 pr-8">{formatTime(song.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
};

export default PlaylistPage;
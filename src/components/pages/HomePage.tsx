import React from 'react';
import SongCard from '../shared/SongCard';
import PlaylistCard from '../shared/PlaylistCard';
import { songs } from '../../data/songs';
import { playlists } from '../../data/playlists';
import { user } from '../../data/user';

interface HomePageProps {
  setActivePage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
  const recentlyPlayedSongs = user.recentlyPlayed
    .map(id => songs.find(song => song.id === id))
    .filter(Boolean);

  const favoriteSongs = user.favorites
    .map(id => songs.find(song => song.id === id))
    .filter(Boolean);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back</h1>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recently Played</h2>
          <button className="text-sm text-purple-500 hover:underline">See all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recentlyPlayedSongs.map(song => song && (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your Playlists</h2>
          <button className="text-sm text-purple-500 hover:underline">See all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {playlists.map(playlist => (
            <PlaylistCard 
              key={playlist.id} 
              playlist={playlist} 
              onClick={() => setActivePage(`playlist-${playlist.id}`)} 
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your Favorites</h2>
          <button className="text-sm text-purple-500 hover:underline">See all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {favoriteSongs.map(song => song && (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
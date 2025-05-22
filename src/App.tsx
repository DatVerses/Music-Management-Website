import React, { useState } from 'react';
import { PlayerProvider } from './context/PlayerContext';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/layout/Sidebar';
import MusicPlayer from './components/player/MusicPlayer';
import HomePage from './components/pages/HomePage';
import SearchPage from './components/pages/SearchPage';
import PlaylistPage from './components/pages/PlaylistPage';
import ChatBot from './components/chat/ChatBot';
import { playlists } from './data/playlists';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    if (activePage === 'home') {
      return <HomePage setActivePage={setActivePage} />;
    }
    
    if (activePage === 'search') {
      return <SearchPage />;
    }
    
    if (activePage.startsWith('playlist-')) {
      const playlistId = activePage.split('-')[1];
      const playlist = playlists.find(p => p.id === playlistId);
      
      if (playlist) {
        return <PlaylistPage playlist={playlist} />;
      }
    }
    
    return <HomePage setActivePage={setActivePage} />;
  };

  return (
    <ThemeProvider>
      <PlayerProvider>
        <div className="flex h-screen bg-gray-900 text-white">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
          
          <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              {renderPage()}
            </main>
            
            <MusicPlayer />
          </div>
          
          <ChatBot />
        </div>
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default App;
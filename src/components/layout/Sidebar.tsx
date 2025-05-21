import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, History, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playlists } from '../../data/playlists';
import { user } from '../../data/user';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', id: 'home' },
    { icon: <Search size={20} />, label: 'Search', id: 'search' },
    { icon: <Library size={20} />, label: 'Your Library', id: 'library' },
    { icon: <PlusSquare size={20} />, label: 'Create Playlist', id: 'create-playlist' },
    { icon: <Heart size={20} />, label: 'Liked Songs', id: 'liked-songs' },
    { icon: <History size={20} />, label: 'Recently Played', id: 'recently-played' }
  ];

  return (
    <div className="flex flex-col h-full w-64 bg-gray-900 dark:bg-gray-900 text-white transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Music size={18} />
          </div>
          <h1 className="text-xl font-bold">Melodify</h1>
        </div>

        <nav>
          <ul className="space-y-3">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center w-full px-3 py-2 rounded-md transition-colors duration-200 ${
                    activePage === item.id
                      ? 'bg-purple-700 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8">
          <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">Your Playlists</h3>
          <ul className="space-y-2">
            {playlists.map(playlist => (
              <li key={playlist.id}>
                <button
                  onClick={() => setActivePage(`playlist-${playlist.id}`)}
                  className={`text-left w-full truncate px-3 py-1.5 rounded-md transition-colors ${
                    activePage === `playlist-${playlist.id}`
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {playlist.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={toggleTheme}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span className="ml-2">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <div className="flex items-center">
          <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
          <div className="ml-2 flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Define Music icon component since it's not available in lucide-react
const Music: React.FC<{ size: number }> = ({ size }) => (
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
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

export default Sidebar;
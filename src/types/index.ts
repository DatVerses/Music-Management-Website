export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  audioSrc: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: string[]; // Array of song IDs
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[]; // Array of song IDs
  recentlyPlayed: string[]; // Array of song IDs
}
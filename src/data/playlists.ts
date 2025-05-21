import { Playlist } from '../types';

export const playlists: Playlist[] = [
  {
    id: '1',
    name: 'Favorite Hits',
    description: 'My all-time favorite songs',
    cover: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=600',
    songs: ['1', '3', '5', '7'],
    createdAt: new Date('2023-06-15')
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing',
    cover: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=600',
    songs: ['2', '4', '8'],
    createdAt: new Date('2023-07-22')
  },
  {
    id: '3',
    name: 'Workout Mix',
    description: 'High energy songs to keep you going',
    cover: 'https://images.pexels.com/photos/4473622/pexels-photo-4473622.jpeg?auto=compress&cs=tinysrgb&w=600',
    songs: ['1', '3', '4', '6'],
    createdAt: new Date('2023-08-10')
  },
  {
    id: '4',
    name: 'Road Trip',
    description: 'Songs for the open road',
    cover: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600',
    songs: ['2', '5', '7', '8'],
    createdAt: new Date('2023-09-05')
  }
];
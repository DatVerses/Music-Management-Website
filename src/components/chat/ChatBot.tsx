import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { usePlayer } from '../../context/PlayerContext';
import { songs } from '../../data/songs';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { playSong } = usePlayer();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleBotResponse('Hi! I\'m your music assistant. I can help you discover music, control playback, and answer questions about the app. How can I help you today?');
    }
  }, [isOpen]);

  const handleBotResponse = async (text: string) => {
    setIsTyping(true);
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
    setIsTyping(false);
  };

  const handleUserMessage = async (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);

    // Process user message
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('play') || lowerText.includes('start')) {
      const songTitle = text.replace(/play|start/i, '').trim();
      const song = songs.find(s => 
        s.title.toLowerCase().includes(songTitle.toLowerCase())
      );
      
      if (song) {
        playSong(song);
        handleBotResponse(`Playing "${song.title}" by ${song.artist} 🎵`);
      } else {
        handleBotResponse("I couldn't find that song. Try another one!");
      }
    } else if (lowerText.includes('recommend') || lowerText.includes('suggestion')) {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      handleBotResponse(`I recommend "${randomSong.title}" by ${randomSong.artist}. Would you like me to play it?`);
    } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
      handleBotResponse("Hello! How can I help you with your music today?");
    } else if (lowerText.includes('help')) {
      handleBotResponse(`
Here are some things I can help you with:
- Play a song (e.g., "play Blinding Lights")
- Get music recommendations
- Control playback
- Answer questions about the app

Just let me know what you'd like to do!
      `);
    } else {
      handleBotResponse("I'm not sure how to help with that. Try asking for song recommendations or to play specific songs!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleUserMessage(input.trim());
      setInput('');
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-96 bg-gray-900 rounded-lg shadow-xl transition-all duration-300 transform ${
        isMinimized ? 'h-14' : 'h-[32rem]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Bot size={20} className="text-purple-500" />
          <span className="font-medium text-white">Music Assistant</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' ? 'bg-purple-600' : 'bg-gray-700'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>
                  <div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-100'
                      }`}
                    >
                      <ReactMarkdown className="prose prose-invert max-w-none">
                        {message.text}
                      </ReactMarkdown>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows={1}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatBot;
import { useState, useMemo, memo } from 'react';

const MessageItem = memo(({ message }) => (
  <div
    className="bg-gray-800 p-3 rounded-lg transition-colors hover:bg-gray-900"
  >
    <p className="text-sm">{message.text}</p>
    <div className="text-xs text-gray-400 mt-1">{message.timestamp}</div>
  </div>
));

const MessageBoard = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Anyone interested in a coding meetup this weekend?", timestamp: "2023-09-25 09:30 AM" },
    { id: 2, text: "Found a great new coffee shop downtown! ☕", timestamp: "2023-09-25 08:45 AM" },
    { id: 3, text: "Looking for recommendations for a good dentist in the area.", timestamp: "2023-09-24 05:15 PM" },
    { id: 4, text: "Anyone interested in a coding meetup this weekend?", timestamp: "2023-09-25 09:30 AM" },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const pinnedMessage = useMemo(() => ({
    id: 0,
    text: "📌 Welcome to our community board! Please read the guidelines before posting.",
    timestamp: "2023-09-20 10:00 AM",
    pinned: true,
  }), []);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        text: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-black text-white flex flex-col max-h-[73vh]">
      {/* Pinned Message Header */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 z-20 border-l-4 border-blue-500 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <h2 className="text-blue-400 text-base md:text-lg font-semibold mb-1 flex items-center gap-2">
            <span>📌</span> Pinned Message
          </h2>
          <p className="text-gray-300 text-sm">{pinnedMessage.text}</p>
        </div>
      </div>

      {/* Scrollable Messages */}
      <div
        className="max-w-4xl mx-auto w-full px-4 mt-10 mb-5 space-y-4 overflow-y-auto"
        style={{
          // Make the scroll container take full height minus header & footer height
          height: 'calc(100vh - 96px)',

          // Important: add top padding equal to pinned header height (~72px) so messages start below pinned message
          paddingTop: '72px',

          willChange: 'transform',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>

      {/* Fixed Footer Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 z-30 border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 sm:gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium shadow-sm transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBoard;

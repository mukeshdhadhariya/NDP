import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

// Grouping messages by date
const groupMessagesByDate = (messages) => {
  return messages.reduce((acc, msg) => {
    const dateKey = new Date(msg.createdAt).toDateString(); // e.g., "Mon May 27 2025"
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(msg);
    return acc;
  }, {});
};

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const pinnedMessage = useMemo(() => ({
    id: 0,
    msg: "📌 Welcome to our community board! Please read the guidelines before posting.",
    createdAt: "2023-09-20T10:00:00Z",
    pinned: true,
  }), []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/getallmsg', {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post('http://localhost:8000/api/v1/user/createmsg', {
        msg: newMessage
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setNewMessage('');
      fetchMessages(); // refresh messages
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const groupedMessages = groupMessagesByDate([pinnedMessage, ...messages]);

  return (
    <div className="bg-black text-white flex flex-col max-h-[73vh]">
      {/* Pinned Header */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 z-20 border-l-4 border-blue-500 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <h2 className="text-blue-400 text-base md:text-lg font-semibold mb-1 flex items-center gap-2">
            <span>📌</span> Pinned Message
          </h2>
          <p className="text-gray-300 text-sm">{pinnedMessage.msg}</p>
        </div>
      </div>

      {/* Scrollable Messages */}
      <div
        className="max-w-4xl mx-auto w-full px-3 mt-7 space-y-4 overflow-y-auto"
        style={{
          height: 'calc(100vh - 96px)',
          paddingTop: '72px',
          willChange: 'transform',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className="text-center text-gray-400 text-xs py-1">
              {new Date(date).toLocaleDateString(undefined, {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
            {msgs.map((message) => (
              <div
                key={message._id || message.id}
                className="bg-gray-800 px-4 py-2 rounded-lg transition-colors hover:bg-gray-900 mb-2"
              >
                <p className="text-sm">{message.msg}</p>
                <div className="text-xs text-gray-500 mt-1 text-right block">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Fixed Input */}
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

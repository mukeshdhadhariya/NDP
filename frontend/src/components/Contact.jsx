import { useState } from "react";
import { MessageSquare, MessagesSquare, Send } from "lucide-react";
import { FaUser, FaComment } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { toast } from "sonner"; 

export default function MessageForm() {
  const [senderName, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const messageHandle = async (e) => {
    e.preventDefault(); 
    setLoading(true); 

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/sendmail",
        { senderName, message }, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success("Message sent successfully! ✅");

      setName("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message! ❌"); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="text-white flex flex-col p-4 justify-center items-center py-30">
      <div className="bg-white/10 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className=" text-center text-2xl mb-4 bg-gradient-to-r from-red-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
        Admin Contact
        </h2>
        <form onSubmit={messageHandle}> 
          <div className="flex items-center gap-2 mb-3 bg-gray-700 p-2 rounded-md border border-gray-600">
            <FaUser className="text-gray-400" />
            <input
              type="text"
              placeholder="Your Name"
              required
              value={senderName}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full text-white outline-none"
            />
          </div>
          <div className="flex items-start gap-2 mb-3 bg-gray-700 p-2 rounded-md border border-gray-600">
            <FaComment className="text-gray-400 mt-1" />
            <textarea
              placeholder="Your Message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full text-white outline-none resize-none min-h-[80px] max-h-60 overflow-y-auto"
              rows="1"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-800 p-2 rounded-md text-white font-semibold disabled:opacity-50"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={16} /> 
              ) : (
              <>
                Send <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

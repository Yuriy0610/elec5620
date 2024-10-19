import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
    const bubbleStyle = isUser
        ? `bg-blue-500 text-white self-end`
        : `bg-gray-300 text-black self-start`;
    return (
        <div className={`max-w-xs mx-2 my-1 p-2 rounded-lg ${bubbleStyle}`}>
            {message}
        </div>
    );
};

const ChatArea = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isUser: false },
        { text: "Hi! I have a question about courses.", isUser: true },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { text: input, isUser: true }]);
            setInput("");
            // Here you would typically send the message to our backend
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
                ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 bg-white border-t">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button type="submit" className="bg-orange-600 text-white p-2 rounded-r-lg hover:bg-orange-700">
                        <Send size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatArea;
import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
    const bubbleStyle = isUser
        ? `bg-blue-500 text-white justify-end`  // 用户消息样式
        : `bg-gray-300 text-black justify-start`;  // AI 消息样式

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-1`}>
            <div className={`max-w-xs mx-2 p-2 rounded-lg ${bubbleStyle}`}>
                {message}
            </div>
        </div>
    );
};

const ChatWithAi = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isUser: false },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, isUser: true },  // 用户消息
            ]);
            setInput("");

            try {
                const role = "doctor";
                const response = await fetch(`http://localhost:8080/api/chat/${role}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: input }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: data.response, isUser: false },  // AI 回复
                ]);
            } catch (error) {
                console.error("Error sending message:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Error: Unable to get a response from the server.", isUser: false },
                ]);
            }
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

export default ChatWithAi;
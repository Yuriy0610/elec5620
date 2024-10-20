import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, MessageCircle, Menu, LogOut, Send, CircleCheckBig, Newspaper, ListChecks, SmilePlus } from 'lucide-react';
import SydneyUniLogo from './SydneyUniLogo';

const MainLayout = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isUser: false },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsing the sidebar

    // Function to toggle sidebar collapse
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, isUser: true },
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
                    { text: data.response, isUser: false },
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
        <div className="flex h-screen bg-gray-100">
            {/* 左侧栏 */}
            <div className={`transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} bg-orange-800 text-white p-6`}>
                <div className="flex items-center justify-between mb-8">
                    <h1 className={`text-xl font-bold ${isCollapsed ? 'hidden' : ''}`}>Sydney Uni Chat</h1>
                    <button 
                        onClick={toggleSidebar} 
                        className="p-1 rounded-full hover:bg-orange-700 transition-colors duration-200"
                    >
                        <Menu size={24} />
                    </button>
                </div>
                <nav className="space-y-4">
                    {[
                        { icon: Home, text: 'Home', to: '/home' },
                        { icon: Users, text: 'My Team', to: '/team' },
                        { icon: MessageCircle, text: 'Contact', to: '/contact' },
                        { icon: CircleCheckBig, text: 'Appointment', to: '/appointment' },
                        { icon: Newspaper, text: 'HealthNews', to: '/healthnews' },
                        { icon: ListChecks, text: 'Symptom Checker', to: '/symptom-checker' },
                        { icon: SmilePlus, text: 'Mental Health', to: '/mentalhealth' },
                    ].map(({ icon: Icon, text, to }) => (
                        <Link 
                            key={text} 
                            to={to} 
                            className={`flex items-center p-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <Icon className="mr-3" size={20} />
                            <span className={`${isCollapsed ? 'hidden' : ''}`}>{text}</span>
                        </Link>
                    ))}
                </nav>
                <div className="mt-8">
                    <h2 className={`text-lg font-semibold mb-4 ${isCollapsed ? 'hidden' : ''}`}>Chat History</h2>
                    <ul className="space-y-2">
                        {['Chat 1', 'Chat 2', 'Chat 3'].map((chat) => (
                            <li key={chat} className="p-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 cursor-pointer">
                                {isCollapsed ? 'C' : chat} {/* Show an abbreviation when collapsed */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 主内容区 */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {/* 顶部栏 */}
                <div className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-orange-800">Chat Room</h2>
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-bold">
                            U
                        </div>
                        <Link to="/login" className="flex items-center text-gray-600 hover:text-orange-800 transition-colors duration-200">
                            <LogOut className="mr-2" size={20} />
                            Logout
                        </Link>
                    </div>
                </div>

                {/* 聊天区域 */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-1/5 opacity-5">
                            <SydneyUniLogo />
                        </div>
                    </div>

                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs rounded-lg px-4 py-2 shadow-sm ${
                                msg.isUser ? 'bg-orange-600 text-white' : 'bg-white text-gray-800'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="max-w-xs rounded-lg px-4 py-2 shadow-sm bg-white text-gray-800">
                                Typing...
                            </div>
                        </div>
                    )}
                </div>

                {/* 输入区 */}
                <form onSubmit={sendMessage} className="p-4 bg-white border-t">
                    <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-3 bg-transparent focus:outline-none"
                        />
                        <button type="submit" className="bg-orange-700 text-white p-3 rounded-full hover:bg-orange-800 transition-colors duration-200">
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MainLayout;

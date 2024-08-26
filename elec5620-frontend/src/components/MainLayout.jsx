import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, MessageCircle, Menu, LogOut } from 'lucide-react';
import ChatArea from './ChatArea';

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="w-64 bg-orange-800 text-white p-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Sydney Uni Chat</h1>
                    <button className="p-1 rounded hover:bg-orange-700">
                        <Menu size={24} />
                    </button>
                </div>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/home" className="flex items-center p-2 rounded hover:bg-orange-700">
                                <Home className="mr-2" size={20} />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/team" className="flex items-center p-2 rounded hover:bg-orange-700">
                                <Users className="mr-2" size={20} />
                                My Team
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="flex items-center p-2 rounded hover:bg-orange-700">
                                <MessageCircle className="mr-2" size={20} />
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Chat History</h2>
                    <ul className="space-y-1">
                        <li className="p-2 rounded hover:bg-orange-700 cursor-pointer">Chat 1</li>
                        <li className="p-2 rounded hover:bg-orange-700 cursor-pointer">Chat 2</li>
                        <li className="p-2 rounded hover:bg-orange-700 cursor-pointer">Chat 3</li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="bg-white shadow p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-orange-600">Chat Room</h2>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                            <span className="text-gray-600">U</span>
                        </div>
                        <Link to="/login" className="flex items-center text-gray-600 hover:text-gray-800">
                            <LogOut className="mr-2" size={20} />
                            Logout
                        </Link>
                    </div>
                </div>

                {/* Chat Area */}
                <ChatArea />
            </div>
        </div>
    );
};

export default MainLayout;
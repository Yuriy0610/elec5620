import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import {
    Rocket, // Updated icon for "Quick Links"
    Users,
    MessageCircle,
    Menu,
    LogOut,
    CircleCheckBig,
    Newspaper,
    ListChecks,
    SmilePlus,
    MessageSquare
} from 'lucide-react';
import { useUser } from './UserContext';

const MainLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const getInitials = (username) => {
        if (!username) return 'U';
        return username
            .split(' ')
            .map((name) => name.charAt(0))
            .join('')
            .toUpperCase();
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} bg-orange-800 text-white p-6`}>
                <div className="flex items-center justify-between mb-8">
                    <h1 className={`text-xl font-bold ${isCollapsed ? 'hidden' : ''}`}>U-Well</h1>
                    <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-orange-700 transition-colors duration-200">
                        <Menu size={24} />
                    </button>
                </div>
                <nav className="space-y-4">
                    {[
                        { icon: Users, text: 'Introduction', to: '/main-layout' }, // Added Introduction page link
                        { icon: Rocket, text: 'Quick Links', to: '/main-layout/home' }, // Updated icon for Quick Links
                        { icon: Newspaper, text: 'HealthNews', to: '/main-layout/healthnews' },
                        { icon: ListChecks, text: 'Symptom Checker', to: '/main-layout/symptom-checker' },
                        { icon: SmilePlus, text: 'Mental Health', to: '/main-layout/mentalhealth' },
                        { icon: MessageSquare, text: 'Chat with AI', to: '/main-layout/chat-ai' },
                        { icon: CircleCheckBig, text: 'Appointment', to: '/main-layout/appointment' },
                        { icon: MessageCircle, text: 'Contact', to: '/main-layout/contact' },
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
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col bg-gray-50">
                <div className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-orange-800">Chat Room</h2>
                    <div className="flex items-center space-x-4">
                        <div
                            className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-bold cursor-pointer"
                            onClick={() => navigate('/main-layout/user-info')}
                        >
                            {user ? getInitials(user.username) : 'U'}
                        </div>
                        <Link to="/login" className="flex items-center text-gray-600 hover:text-orange-800 transition-colors duration-200">
                            <LogOut className="mr-2" size={20} />
                            Logout
                        </Link>
                    </div>
                </div>

                {/* Dynamic content area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;

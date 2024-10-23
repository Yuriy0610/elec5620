import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom'; // 引入 Outlet
import { Home, Users, MessageCircle, Menu, LogOut, CircleCheckBig, Newspaper, ListChecks, SmilePlus, MessageSquare } from 'lucide-react'; // 引入新的图标

const MainLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false); // 用于侧边栏折叠状态
    const navigate = useNavigate(); // 用于控制路由导航

    // 切换侧边栏的折叠状态
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
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
                        { icon: Home, text: 'Home', to: '/main-layout' },
                        { icon: Users, text: 'My Team', to: '/main-layout/team' },
                        { icon: MessageCircle, text: 'Contact', to: '/main-layout/contact' },
                        { icon: CircleCheckBig, text: 'Appointment', to: '/main-layout/appointment' },
                        { icon: Newspaper, text: 'HealthNews', to: '/main-layout/healthnews' },
                        { icon: ListChecks, text: 'Symptom Checker', to: '/main-layout/symptom-checker' },
                        { icon: SmilePlus, text: 'Mental Health', to: '/main-layout/mentalhealth' },
                        // 新增 Chat with AI 菜单项
                        { icon: MessageSquare, text: 'Chat with AI', to: '/main-layout/chat-ai' },
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

            {/* 主内容区 */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {/* 顶部栏 */}
                <div className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-orange-800">Chat Room</h2>
                    <div className="flex items-center space-x-4">
                        <div 
                            className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-bold cursor-pointer"
                            onClick={() => navigate('/user-info')}
                        >
                            U
                        </div>
                        <Link to="/login" className="flex items-center text-gray-600 hover:text-orange-800 transition-colors duration-200">
                            <LogOut className="mr-2" size={20} />
                            Logout
                        </Link>
                    </div>
                </div>

                {/* 动态渲染的内容区域 */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <Outlet /> {/* 渲染嵌套的子路由内容 */}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
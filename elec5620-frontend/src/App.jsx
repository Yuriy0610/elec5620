import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';
import SymptomChecker from './components/SymptomChecker';
import Appointment from './components/Appointment';
import Confirmation from './components/Confirmation';
import MentalHealthSupport from './components/MentalHealthSupport';
import ChatWithAi from './components/chatwithai';
import AiResponseSymptomChecker from './components/AiResponse_symptomchecker';
import HealthNews from './components/HealthNews';
import Home from './components/Home';
import UserInfo from './components/UserInfo'; // 导入用户信息组件

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* MainLayout 作为父路由 */}
                <Route path="/main-layout" element={<MainLayout />}>
                    {/* 这些页面都将显示在 MainLayout 内的右侧区域 */}

                    <Route path="contact" element={<div>Contact Content</div>} />
                    <Route path="symptom-checker" element={<SymptomChecker />} />
                    <Route path="appointment" element={<Appointment />} />
                    <Route path="confirmation" element={<Confirmation />} />
                    <Route path="mentalhealth" element={<MentalHealthSupport />} />
                    <Route path="chat-ai" element={<ChatWithAi />} />
                    <Route path="ai-response" element={<AiResponseSymptomChecker />} />
                    <Route path="healthnews" element={<HealthNews />} />
                    <Route path="home" element={<Home />} />
                    <Route path="user-info" element={<UserInfo />} /> {/* 添加用户信息页面路由 */}
                </Route>

                {/* 重定向到登录页面 */}
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
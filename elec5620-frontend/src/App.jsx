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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* MainLayout 作为父路由 */}
                <Route path="/main-layout" element={<MainLayout />}>
                    {/* 这些页面都将显示在 MainLayout 内的右侧区域 */}
                    <Route path="home" element={<div>Home Content</div>} /> {/* 示例：主页内容 */}
                    <Route path="contact" element={<div>Contact Content</div>} /> {/* 示例：联系人内容 */}
                    <Route path="symptom-checker" element={<SymptomChecker />} />
                    <Route path="appointment" element={<Appointment />} />
                    <Route path="confirmation" element={<Confirmation />} />
                    <Route path="mentalhealth" element={<MentalHealthSupport />} />
                    <Route path="chat-ai" element={<ChatWithAi />} /> {/* 添加 ChatWithAi 路由 */}
                    <Route path="ai-response" element={<AiResponseSymptomChecker />} />
                    <Route path="healthnews" element={<HealthNews />} />



                </Route>

                {/* 重定向到登录页面 */}
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
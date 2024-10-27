import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';
import SymptomChecker from './components/SymptomChecker';
import Appointment from './components/Appointment';
import MentalHealthSupport from './components/MentalHealthSupport';
import ChatWithAi from './components/ChatWithAi';
import HealthNews from './components/HealthNews';
import Home from './components/Home';
import UserInfo from './components/UserInfo';
import UserAppointments from './components/Appointment'; // Importing UserAppointments
import { UserProvider } from './components/UserContext';
import Introduction from './components/Introduction';
import NotFound from './components/NotFound';
import ChatToLLM from './components/ChatToLLM'; // Import the new component

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* MainLayout with nested routes */}
                    <Route path="/main-layout" element={<MainLayout />}>
                        <Route index element={<Introduction />} /> {/* Default content */}
                        <Route path="symptom-checker" element={<SymptomChecker />} />
                        <Route path="appointment" element={<Appointment />} />
                        <Route path="mentalhealth" element={<MentalHealthSupport />} />
                        <Route path="chat-ai" element={<ChatWithAi />} />
                        <Route path="healthnews" element={<HealthNews />} />
                        <Route path="home" element={<Home />} />
                        <Route path="user-info" element={<UserInfo />} />
                        <Route path="user-appointments" element={<UserAppointments />} /> {/* New route for UserAppointments */}
                        <Route path="chat-to-llm" element={<ChatToLLM />} /> 
                    </Route>

                    {/* Redirect to login if path is root */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;

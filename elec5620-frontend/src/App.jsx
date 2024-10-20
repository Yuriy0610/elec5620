import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';
import SymptomChecker from './components/SymptomChecker';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main-layout" element={<MainLayout />} />
                <Route path="/home" element={<MainLayout />} />
                <Route path="/team" element={<MainLayout />} />
                <Route path="/contact" element={<MainLayout />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/symptom-checker" element={<SymptomChecker />} />
            </Routes>
        </Router>
    );
}

export default App;

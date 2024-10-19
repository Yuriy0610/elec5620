import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';
import Appointment from './components/Appointment';
import Confirmation from './components/Confirmation';

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
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
        </Router>
    );
}

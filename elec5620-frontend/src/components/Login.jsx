import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // validate login credentials here

        // Simulate successful login
        console.log('Logged in with: ', formData);

        // Redirect to the main layout (chat room)
        navigate('/main-layout'); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-full p-2 mb-4 border rounded"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        className="w-full p-2 mb-4 border rounded"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <button type="submit" className="w-full p-2 text-white rounded bg-orange-600 hover:bg-orange-700">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
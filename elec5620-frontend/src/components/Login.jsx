import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Login</h2>
                <form>
                    <input className="w-full p-2 mb-4 border rounded" type="email" placeholder="Email" />
                    <input className="w-full p-2 mb-4 border rounded" type="password" placeholder="Password" />
                    <button className="w-full p-2 text-white rounded bg-orange-600 hover:bg-orange-700">Login</button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Register</h2>
                <form>
                    <input className="w-full p-2 mb-4 border rounded" type="text" placeholder="Full Name" />
                    <input className="w-full p-2 mb-4 border rounded" type="email" placeholder="Email" />
                    <input className="w-full p-2 mb-4 border rounded" type="password" placeholder="Password" />
                    <input className="w-full p-2 mb-4 border rounded" type="password" placeholder="Confirm Password" />
                    <button className="w-full p-2 text-white rounded bg-orange-600 hover:bg-orange-700">Register</button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
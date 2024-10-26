import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrorMessage(''); // Clear error message on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validation here (e.g., password match check)
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    
        // Check if role is selected
        if (formData.role === '') {
            alert('Please select a role');
            return;
        }
    
        const user = {
            username: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
        };
    
        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.error); // Access the error message from JSON
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('User  created successfully:', data);
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage(error.message); // Set error message to state
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Register</h2>
                {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>} {/* Display error message */}
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-full p-2 mb-4 border rounded"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                    />
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
                    <input
                        className="w-full p-2 mb-4 border rounded"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                    />

                    <select
                        className="w-full p-2 mb-4 border rounded text-gray-500"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled className="text-gray-400">Please select your registration identity</option>
                        <option value="student" className="text-black">Student</option>
                        <option value="gp" className=" text-black">GP</option>
                    </select>

                    <button type="submit" className="w-full p-2 text-white rounded bg-orange-600 hover:bg-orange-700">
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
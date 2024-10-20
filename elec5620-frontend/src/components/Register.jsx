// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // validation here (e.g., password match check)

//         // Simulate successful registration
//         console.log('Registered with: ', formData);

//         // Redirect to login page after registration
//         navigate('/login');
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="p-6 bg-white rounded shadow-md">
//                 <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Register</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         className="w-full p-2 mb-4 border rounded"
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         placeholder="Full Name"
//                     />
//                     <input
//                         className="w-full p-2 mb-4 border rounded"
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Email"
//                     />
//                     <input
//                         className="w-full p-2 mb-4 border rounded"
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="Password"
//                     />
//                     <input
//                         className="w-full p-2 mb-4 border rounded"
//                         type="password"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         placeholder="Confirm Password"
//                     />
//                     <button type="submit" className="w-full p-2 text-white rounded bg-orange-600 hover:bg-orange-700">
//                         Register
//                     </button>
//                 </form>
//                 <p className="mt-4 text-center">
//                     Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Register;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validation here (e.g., password match check)
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    
        // Create a new user object to send to the backend
        const user = {
            username: formData.fullName,
            email: formData.email,
            password: formData.password,
        };
    
        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                console.log('Response:', response);  // Log the response status
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('User created successfully:', data);
                navigate('/login');  // Redirect to login page after registration
            })
            .catch((error) => {
                console.error('Error:', error);  // Log the error for debugging
            });  
            
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Register</h2>
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
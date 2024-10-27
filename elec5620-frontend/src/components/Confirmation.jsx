// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Confirmation = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { name, email, selectedDate, selectedHospital, selectedDepartment, selectedTime } = location.state || {};

//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//             <h1 className="text-3xl font-bold mb-8">Appointment Confirmed!</h1>
//             <div className="bg-white p-6 rounded shadow-md space-y-4">
//                 <p><strong>Name:</strong> {name}</p>
//                 <p><strong>Email:</strong> {email}</p>
//                 <p><strong>Hospital:</strong> {selectedHospital}</p>
//                 <p><strong>Department:</strong> {selectedDepartment}</p>
//                 <p><strong>Date:</strong> {selectedDate ? selectedDate.toLocaleDateString() : ''}</p>
//                 <p><strong>Time:</strong> {selectedTime}</p>
//             </div>
//             <button
//                 onClick={() => navigate('/main-layout')} // 修改为返回到 MainLayout
//                 className="mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200"
//             >
//                 Back to home
//             </button>
//         </div>
//     );
// };

// export default Confirmation;
// src/components/UserAppointments.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const UserAppointments = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!user || !user.id) {
                setLoading(false);
                return; // Exit if no user is logged in
            }
    
            try {
                const response = await axios.get(`/api/appointments/${user.id}`);
                console.log(response.data); // Log to confirm the structure
    
                // Update this to handle either an array directly or an object containing the array
                if (Array.isArray(response.data)) {
                    setAppointments(response.data);
                } else if (Array.isArray(response.data.appointments)) {
                    setAppointments(response.data.appointments);
                } else {
                    setAppointments([]); // Set to an empty array if appointments not found
                }
            } catch (err) {
                setError('Failed to fetch appointments');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAppointments();
    }, [user]);    

    if (loading) {
        return <div>Loading appointments...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
            
            {appointments.length > 0 ? (
                <ul className="space-y-4">
                    {appointments.map((appointment) => (
                        <li key={appointment.id} className="border-b pb-2">
                            <h3 className="text-lg font-medium">{appointment.title}</h3>
                            <p>{new Date(appointment.dateTime).toLocaleString()}</p>
                            <p>{appointment.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments found.</p>
            )}
        </div>
    );
};

export default UserAppointments;

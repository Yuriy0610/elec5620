import React, { useEffect, useState } from 'react';
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
                return;
            }

            try {
                const response = await fetch(`/api/appointments/user/${user.id}`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setAppointments(data);
                } else {
                    setAppointments([]);
                }
            } catch (err) {
                setError('Failed to fetch appointments');
                console.error("Error fetching appointments:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [user]);

    const handleDelete = async (appointmentId) => {
        try {
            await fetch(`/api/appointments/${appointmentId}`, { method: 'DELETE' });
            // Remove the deleted appointment from the state
            setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
        } catch (err) {
            setError('Failed to delete appointment');
            console.error("Error deleting appointment:", err);
        }
    };

    if (loading) {
        return <div>Loading appointments...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-orange-50 p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
            
            {appointments.length > 0 ? (
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left">Appointment</th>
                            <th className="px-4 py-2 text-left">Date & Time</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => {
                            // Remove 'T' from dateTime string for display
                            const formattedDateTime = appointment.dateTime.replace('T', ' ');

                            return (
                                <tr key={appointment.id} className="border-b">
                                    <td className="px-4 py-2">{appointment.title}</td>
                                    <td className="px-4 py-2">{formattedDateTime}</td>
                                    <td className="px-4 py-2">
                                        <button 
                                            onClick={() => handleDelete(appointment.id)} 
                                            className="text-red-600 hover:underline">
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No appointments found.</p>
            )}
        </div>
    );
};

export default UserAppointments;

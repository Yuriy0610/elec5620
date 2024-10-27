import React from 'react';
import { useUser } from './UserContext'; // Import useUser hook

const UserInfo = () => {
    const { user } = useUser(); // Access user data from context

    // Check if user data is available
    if (!user) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '40px',
                color: '#555',
                fontSize: '1.2rem'
            }}>
                No user information available.
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#f9f9f9'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '600px',
                backgroundColor: '#FFF7ED',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'left',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                marginTop: '40px',
                marginBottom: '80px'
            }}>
                <h2 style={{
                    fontSize: '1.4rem',
                    color: '#333',
                    textAlign: 'center',
                    marginBottom: '15px'
                }}>Your Information Below</h2>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Name:</strong> {user.username || 'N/A'}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Email:</strong> {user.email || 'N/A'}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Role:</strong> {user.role || 'N/A'}
                </div>
            </div>
        </div>
    );
};

export default UserInfo;

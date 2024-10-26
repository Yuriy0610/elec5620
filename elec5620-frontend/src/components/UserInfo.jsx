import React from 'react';
import { useUser  } from './UserContext'; // Import useUser  hook

const UserInfo = () => {
    const { user } = useUser (); // Access user data from context

    // Check if user data is available
    if (!user) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>No user information available.</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User  Information</h2>
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
    );
};

export default UserInfo;
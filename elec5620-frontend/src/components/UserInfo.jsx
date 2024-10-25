import React from 'react';

const UserInfo = () => {
    // 初始化用户信息为英文
    const userInfo = {
        name: 'John',
        email: 'john@example.com',
        identity: 'Student'
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Information</h2>
            <div style={{ marginBottom: '10px' }}>
                <strong>Name:</strong> {userInfo.name}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Email:</strong> {userInfo.email}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Identity:</strong> {userInfo.identity}
            </div>
        </div>
    );
};

export default UserInfo;






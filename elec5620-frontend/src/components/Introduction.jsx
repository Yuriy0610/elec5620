// components/Introduction.js
import React from 'react';

const Introduction = () => {
    return (
        <div className="text-center p-6">
            <h2 className="text-2xl font-bold text-orange-800">Welcome to U-Well</h2>
            <p className="mt-4 text-gray-700">
                U-Well is your wellness companion at the University of Sydney, providing support for your health and wellness needs. 
                Explore features such as mental health support, appointment scheduling, symptom checking, health news, and AI-powered chat assistance.
            </p>
            <p className="mt-2 text-gray-600">
                Use the sidebar to navigate through the app and discover the resources available to help you thrive during your time at university.
            </p>
        </div>
    );
};

export default Introduction;

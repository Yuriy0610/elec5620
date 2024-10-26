// components/Introduction.js
import React from 'react';

const Introduction = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-orange-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-extrabold text-orange-700">Welcome to U-Well</h2>
            <p className="mt-4 text-lg text-gray-800">
                Your wellness companion at your University in Australia is here to support your health and wellness needs. 
                With U-Well, you can easily access a variety of features designed to enhance your university experience:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-700">
                <li>💬 <strong>Chat with AI:</strong> Get instant assistance and answers to your queries.</li>
                <li>🔗 <strong>Quick Links:</strong> Access essential resources at your university.</li>
                <li>🩺 <strong>Symptom Checks:</strong> Assess your health concerns with ease.</li>
                <li>🧠 <strong>Mental Health Support:</strong> Find the help you need when you need it.</li>
                <li>📰 <strong>Health News:</strong> Stay informed with the latest health updates.</li>
            </ul>
            <p className="mt-4 text-gray-600">
                Use the sidebar to navigate through the app and discover all the resources available to help you thrive during your time at university.
            </p>
        </div>
    );
};

export default Introduction;
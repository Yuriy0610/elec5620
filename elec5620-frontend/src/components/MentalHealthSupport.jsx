import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MentalHealthSupport = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate a call to the AI-powered mental health support agent
    setTimeout(() => {
      if (userInput.toLowerCase().includes('stress')) {
        setResponse('It sounds like you are feeling stressed. Would you like to try a guided breathing exercise to help you relax?');
      } else if (userInput.toLowerCase().includes('anxiety')) {
        setResponse('I understand anxiety can be overwhelming. Let’s take a moment to pause. I recommend trying a 5-minute meditation.');
      } else {
        setResponse('I’m here for you. Feel free to share how you’re feeling today.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-orange-800 mb-4">Mental Health Support</h1>
        <p className="text-gray-700 mb-6">
          Welcome to U-Well’s mental health support service. Here, you can talk about how you feel, and receive helpful advice on stress management and emotional well-being.
        </p>

        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            placeholder="How are you feeling today?"
            value={userInput}
            onChange={handleInputChange}
            rows="5"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-800 transition-colors duration-200"
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>

        {response && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">Support Response:</h3>
            <p className="text-gray-800">{response}</p>
          </div>
        )}

        <button
          onClick={() => navigate('/main')}
          className="mt-6 w-full bg-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Back to Main Page
        </button>
      </div>
    </div>
  );
};

export default MentalHealthSupport;

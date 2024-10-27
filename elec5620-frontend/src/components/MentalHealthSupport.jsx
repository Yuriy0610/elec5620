import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const MentalHealthSupport = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false); 
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
        <div className="bg-orange-50 shadow-md rounded-lg p-12">
          <h1 className="text-2xl font-bold text-orange-800 mb-4">Access Restricted</h1>
          <p className="text-lg text-gray-700">
            Please <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>log in</span> to use the mental health support service.
          </p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/api/get/doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!res.ok) {
        throw new Error('Failed to get AI response');
      }

      const result = await res.json();
      setResponse(result.response);
      setShowResponse(true);

      const saveChatResponse = await fetch(`http://localhost:8080/api/chats/create/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chat: userInput }),
      });

      if (!saveChatResponse.ok) {
        throw new Error('Failed to save chat');
      }

      console.log("Chat saved:", await saveChatResponse.json());

    } catch (error) {
      console.error('Error:', error);
      alert('There was an issue during submission. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-10">
      <div className="bg-orange-50 shadow-md rounded-lg p-12 w-full max-w-5xl">
        {showResponse ? (
          <div>
            <h1 className="text-4xl font-bold text-orange-800 mb-8">Your One-Stop Mental Health Support!</h1>
            <div className="bg-gray-100 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-orange-800 mb-4">I hear you! 😊</h3>
              <ReactMarkdown className="text-gray-800" remarkPlugins={[remarkGfm]}>
                {response}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-orange-800 mb-8">Mental Health Support</h1>
            <p className="text-lg text-gray-700 mb-8">
              Welcome to U-Well’s mental health support service. Here, you can talk about how you feel and receive helpful advice on stress management and emotional well-being.
            </p>
            <form onSubmit={handleSubmit} className="mb-8">
              <textarea
                placeholder="How are you feeling today?"
                value={userInput}
                onChange={handleInputChange}
                rows="8"
                className="w-full p-6 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-orange-700 text-white py-4 rounded-lg hover:bg-orange-800 transition-colors duration-200"
              >
                {loading ? 'Processing...' : 'Submit'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MentalHealthSupport;

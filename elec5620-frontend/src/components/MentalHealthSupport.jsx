import React, { useState } from 'react';

const MentalHealthSupport = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false); // To control the form and response visibility

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Call your AI API service here
    try {
      const res = await fetch('http://localhost:8080/api/chat/doctor', {
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
      setResponse(result.response); // Assuming your AI API returns a 'response' field
      setShowResponse(true); // Show the AI's response
    } catch (error) {
      console.error('Error:', error);
      alert('There was an issue during submission. Please try again later.');
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-10"> {/* Increased padding */}
      <div className="bg-white shadow-md rounded-lg p-12 w-full max-w-5xl"> {/* Increased max-width and padding */}
        {showResponse ? (
          // Display AI response after form submission
          <div>
            <h1 className="text-4xl font-bold text-orange-800 mb-8">Mental Health Support</h1> {/* Increased font size and margin */}
            <div className="bg-gray-100 p-8 rounded-lg shadow-sm"> {/* Increased padding */}
              <h3 className="text-2xl font-semibold text-orange-800 mb-4">Support Response:</h3> {/* Increased font size */}
              <p className="text-gray-800">{response}</p>
            </div>
          </div>
        ) : (
          // Form input before AI response
          <>
            <h1 className="text-4xl font-bold text-orange-800 mb-8">Mental Health Support</h1> {/* Increased font size and margin */}
            <p className="text-lg text-gray-700 mb-8"> {/* Increased font size and margin */}
              Welcome to U-Well’s mental health support service. Here, you can talk about how you feel, and receive helpful advice on stress management and emotional well-being.
            </p>

            <form onSubmit={handleSubmit} className="mb-8"> {/* Increased margin */}
              <textarea
                placeholder="How are you feeling today?"
                value={userInput}
                onChange={handleInputChange}
                rows="8" /* Increased rows for larger text area */
                className="w-full p-6 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" /* Increased padding */
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-orange-700 text-white py-4 rounded-lg hover:bg-orange-800 transition-colors duration-200" /* Increased button padding */
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
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For better markdown handling (tables, strikethrough, etc.)
import remarkBreaks from 'remark-breaks'; // For handling line breaks

const universities = [
    { name: 'All', url: 'https://www.sydney.edu.au' },
    { name: 'The University of Sydney', url: 'https://www.sydney.edu.au' },
    { name: 'The University of Melbourne', url: 'https://www.unimelb.edu.au' },
    { name: 'The Australian National University', url: 'https://www.anu.edu.au' },
    { name: 'The University of Queensland', url: 'https://www.uq.edu.au' },
    { name: 'University of New South Wales (UNSW)', url: 'https://www.unsw.edu.au' },
    { name: 'Monash University', url: 'https://www.monash.edu' },
    { name: 'University of Western Australia', url: 'https://www.uwa.edu.au' },
    { name: 'University of Adelaide', url: 'https://www.adelaide.edu.au' },
    { name: 'Macquarie University', url: 'https://www.mq.edu.au' },
    { name: 'University of Technology Sydney (UTS)', url: 'https://www.uts.edu.au' },
];

const Home = () => {
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUniversityChange = (e) => {
        setSelectedUniversity(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedUniversity) {
            alert("Please select a university.");
            return;
        }

        setLoading(true); // Start loading
        setResponse(null); // Clear previous response

        try {
            const res = await fetch(`http://localhost:8080/api/chat/health_support_quick_links?university=${encodeURIComponent(selectedUniversity)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: '', // Include a message if needed
                }),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setResponse(data.response); // Response as markdown text
        } catch (error) {
            console.error("Error communicating with the server:", error);
            setResponse("There was an error processing your request. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-orange-800 mb-6">Get to know resources available to you!</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="university" className="block text-lg font-medium text-gray-700">
                        Select a University:
                    </label>
                    <select
                        id="university"
                        value={selectedUniversity}
                        onChange={handleUniversityChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">-- Select a University --</option>
                        {universities.map((university, index) => (
                            <option key={index} value={university.name}>
                                {university.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                    disabled={!selectedUniversity || loading} // Disable if loading
                >
                    Ask AI
                </button>
            </form>

            {loading ? (
                <div className="mt-6 bg-yellow-100 p-4 rounded-md text-yellow-800 font-semibold">
                    Request processing... please wait :)
                </div>
            ) : response && (
                <div className="mt-6 bg-gray-100 p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-gray-700">Here you go!</h2>
                    {/* Use ReactMarkdown with remark plugins for formatting */}
                    <ReactMarkdown 
                        className="prose"
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                    >
                        {response}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default Home;

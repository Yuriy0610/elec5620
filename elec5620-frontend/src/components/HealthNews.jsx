import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const HealthNews = () => {
    const [newsResponse, setNewsResponse] = useState([]); // Store news
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Automatically request health news when the page loads
    useEffect(() => {
        const fetchHealthNews = async () => {
            setLoading(true);
            setError(null);

            try {
                const role = "news_reporter"; // API role
                const response = await fetch(`http://localhost:8080/api/get/${role}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: "Give me the latest health news." }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Format the response content
                const formattedResponse = data.response
                    .split('\n')
                    .filter((line) => line.trim() !== '');

                setNewsResponse(formattedResponse);
            } catch (err) {
                setError(err.message); // Catch and display error message
            } finally {
                setLoading(false); // Stop loading state
            }
        };

        fetchHealthNews(); // Execute the fetch function
    }, []);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-400 p-10"
            style={{ backgroundImage: `url('https://via.placeholder.com/1920x1080')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-lg overflow-hidden">
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-center mb-6 text-indigo-900">
                        Health News 📰
                    </h1>

                    {/* Loading Message with slight yellow background */}
                    {loading && (
                        <p className="text-center text-lg font-medium text-gray-700 bg-yellow-200 p-4 rounded-md">
                            Loading health news...
                        </p>
                    )}

                    {/* Error Message */}
                    {error && (
                        <p className="text-center text-red-600 font-semibold">
                            Error: {error}
                        </p>
                    )}

                    {/* Render News */}
                    {newsResponse.length > 0 && (
                        <div className="space-y-6">
                            {newsResponse.map((line, index) => (
                                <div
                                    key={index}
                                    className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                                        index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'
                                    }`} // Alternate background colors
                                >
                                    {/* Render Markdown content */}
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {line}
                                    </ReactMarkdown>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HealthNews;

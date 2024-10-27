import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const HealthNews = () => {
    const [newsResponse, setNewsResponse] = useState([]); // Store news
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [category, setCategory] = useState("General"); // Default category

    // Define available categories
    const categories = ["General", "Mental Health", "Nutrition", "Fitness", "Medical Research", "Public Health"];

    // Function to fetch health news based on category
    const fetchHealthNews = async (selectedCategory) => {
        setLoading(true);
        setError(null);

        try {
            const role = "news_reporter"; // API role
            const response = await fetch(`http://localhost:8080/api/get/${role}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: `Give me the latest ${selectedCategory.toLowerCase()} news.` }),
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

    // Fetch default category news on page load
    useEffect(() => {
        fetchHealthNews(category);
    }, [category]);

    // Helper function to determine the type of line
    const getColorClass = (line) => {
        if (line.toLowerCase().includes("alert")) {
            return 'bg-red-100'; // Light red for health alerts
        } else if (line.toLowerCase().includes("source")) {
            return 'bg-yellow-100'; // Yellow for sources
        } else if (line.toLowerCase().includes("tip")) {
            return 'bg-green-100'; // Light green for health tips
        }
        return 'bg-blue-100'; // Default color
    };

    return (
        <div className="min-h-screen bg-orange-50 rounded-lg p-10">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-lg overflow-hidden">
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-center text-orange-800 mb-6">
                        Health News 📰
                    </h1>

                    {/* Category Selector */}
                    <div className="flex justify-center space-x-4 mb-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`py-2 px-4 rounded-full text-white ${category === cat ? 'bg-orange-700' : 'bg-orange-500'} hover:bg-orange-600 transition`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Loading Message with slight yellow background */}
                    {loading && (
                        <p className="text-center text-lg font-medium text-yellow-800 bg-yellow-100 p-4 rounded-md">
                            Loading {category} news...
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
                                    className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${getColorClass(line)}`}
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

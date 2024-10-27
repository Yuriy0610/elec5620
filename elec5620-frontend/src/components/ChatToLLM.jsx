import { useEffect, useState } from 'react';
import { useUser } from './UserContext'; // Import the user context
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm'; // Import remark-gfm for GitHub Flavored Markdown

const ChatToLLM = () => {
    const { user } = useUser(); // Access the user context
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false); // New state for processing message

    // Fetch chats for the current user
    const fetchChats = async () => {
        if (!user) {
            setError("No user is logged in.");
            return; // Exit if no user is logged in
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:8080/api/chats/user/${user.id}`); // Use user.id
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            setChats(data);
            console.log(data); // Log the full response for debugging
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to send concatenated chat messages to LLM
    const sendToLLM = async () => {
        const concatenatedChats = chats.map(chat => chat.chat).join(' '); // Use chat.chat instead of chat.message

        setIsProcessing(true); // Start processing

        try {
            const role = "doctor"; // Define your role
            const llmResponse = await fetch(`http://localhost:8080/api/get/${role}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: concatenatedChats }), // Send concatenated chats
            });
            console.log(concatenatedChats);

            if (!llmResponse.ok) {
                throw new Error(`HTTP error! Status: ${llmResponse.status}`);
            }

            const data = await llmResponse.json();
            setResponse(data.response); // Adjust based on your LLM response structure
            console.log(data.response); // Log the LLM response for debugging
        } catch (err) {
            setError(err.message);
        } finally {
            setIsProcessing(false); // Stop processing
        }
    };

    useEffect(() => {
        fetchChats();
    }, [user]); // Fetch chats whenever the user changes

    return (
        <div className="min-h-screen bg-orange-50 p-10 rounded-lg">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-lg overflow-hidden p-8">
                <h1 className="text-4xl font-bold text-center text-orange-800 mb-6">
                    Your Recent Chats 
                </h1>

                {/* Loading Message */}
                {loading && <p className="text-center text-lg">Loading chats...</p>}

                {/* Error Message */}
                {error && <p className="text-center text-red-600">Error: {error}</p>}

                {/* Chat Messages */}
                {chats.length > 0 && (
                    <div className="space-y-4 mb-4">
                        {chats.map((chat, index) => (
                            <div key={index} className="p-4 border rounded-md shadow-sm bg-gray-100">
                                <p>{chat.chat}</p> {/* Display the chat content */}
                            </div>
                        ))}
                    </div>
                )}

                <button 
                    onClick={sendToLLM}
                    className="mt-4 bg-orange-700 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Get Analysis
                </button>

                {/* Processing Message */}
                {isProcessing && (
                    <div className="mt-4 p-4 bg-yellow-200 border rounded-md text-center">
                        <p>Processing your current analysis.. Please wait!</p>
                    </div>
                )}

                {/* LLM Response */}
                {response && (
                    <div className="mt-6 p-4 border rounded-md bg-orange-100">
                        <h2 className="font-semibold">Here are my thoughts: 🤝</h2>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatToLLM;

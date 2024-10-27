import React, { useState } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useUser } from './UserContext'; // Import the user context

const ChatMessage = ({ message, isUser }) => {
    const bubbleStyle = isUser
        ? `bg-orange-100 text-black justify-end`
        : `bg-orange-200 text-black justify-start`;

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-1`}>
            <div className={`max-w-xs mx-2 p-2 rounded-lg ${bubbleStyle}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message}
                </ReactMarkdown>
            </div>
        </div>
    );
};

const ChatWithAi = () => {
    const { user } = useUser(); // Access the user context
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today? \n\n\n Ping 'Appointment' or 'Reservation' to help me track your schedules!", isUser: false },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [appointmentTitle, setAppointmentTitle] = useState("");
    const [error, setError] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, isUser: true },
            ]);

            if (input.toLowerCase().includes("appointment") || input.toLowerCase().includes("reservation")) {
                setShowTimePicker(true);
                setInput("");
                return;
            }

            setInput("");
            setLoading(true);
            try {
                const role = "doctor";
                const response = await fetch(`http://localhost:8080/api/get/${role}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: input }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: data.response, isUser: false },
                ]);
            } catch (error) {
                console.error("Error sending message:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Error: Unable to get a response from the server.", isUser: false },
                ]);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleConfirm = async () => {
        if (!selectedDate || !selectedTimeSlot || !appointmentTitle) {
            setError("Please select a date, a time slot, and provide a title for the appointment.");
            return;
        }

        const appointmentStatus = await saveAppointment(); // Check if the appointment was saved successfully

        if (appointmentStatus) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: `Appointment confirmed with title: "${appointmentTitle}" on ${selectedDate}, time slot: ${selectedTimeSlot}`,
                    isUser: false,
                },
            ]);
        } else {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Oh no! Time slot not available, please choose another appointment.", isUser: false },
            ]);
        }

        setShowTimePicker(false);
        setSelectedDate("");
        setSelectedTimeSlot("");
        setAppointmentTitle("");
        setError("");
    };

    const saveAppointment = async () => {
        if (!user) {
            console.error("No user is logged in.");
            return false; // Return false if user is not logged in
        }
    
        // Prepare the data to be sent
        const appointmentData = {
            title: appointmentTitle,
            dateTime: `${selectedDate}T${selectedTimeSlot.split('-')[0]}:00`, // Ensure this matches your backend format
        };
    
        try {
            const response = await fetch(`http://localhost:8080/api/appointments/create/${user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointmentData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Appointment saved:", data);
            return true; // Return true if appointment saved successfully
        } catch (error) {
            console.error("Error saving appointment:", error);
            return false; // Return false if there was an error
        }
    };    

    const handleTimeSlotClick = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    const getTomorrowDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split('T')[0];
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
                ))}
                {loading && <div className="text-center text-gray-500">Loading...</div>}
            </div>

            {showTimePicker && (
                <div className="p-4 bg-white border-t">
                    <h2 className="text-lg font-semibold">Select Appointment Time</h2>
                    <input
                        type="text"
                        value={appointmentTitle}
                        onChange={(e) => setAppointmentTitle(e.target.value)}
                        placeholder="Enter Appointment Title"
                        className="border rounded p-2 mt-2 w-full"
                    />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={getTomorrowDate()}
                        className="border rounded p-2 mt-2 w-full"
                    />
                    <div className="mt-4">
                        <h3 className="text-md font-semibold">Select Time Slot:</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {["8:00-9:00", "9:00-10:00", "10:00-11:00", "14:00-15:00", "15:00-16:00"].map((timeSlot) => (
                                <button
                                    key={timeSlot}
                                    onClick={() => handleTimeSlotClick(timeSlot)}
                                    className={`border rounded py-2 px-4 ${selectedTimeSlot === timeSlot ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-500 hover:text-white'}`}
                                >
                                    {timeSlot}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-600 mt-2">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end mt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}

            {!showTimePicker && (
                <form onSubmit={sendMessage} className="p-4 bg-white border-t">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button type="submit" className="bg-orange-600 text-white p-2 rounded-r-lg hover:bg-orange-700">
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ChatWithAi;

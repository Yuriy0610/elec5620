import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, MessageCircle, Menu, LogOut, Send, CircleCheckBig, Newspaper } from 'lucide-react';
import SydneyUniLogo from './SydneyUniLogo';

const MainLayout = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isUser: false },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [error, setError] = useState(""); // 新增 error 状态

    const sendMessage = async (e) => {
        e.preventDefault();

        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, isUser: true },
            ]);

            if (input.toLowerCase().includes("appointment")||input.toLowerCase().includes("reservation")) {
                setShowTimePicker(true);
                setInput("");
                return;
            }

            setInput("");

            try {
                const role = "doctor";
                const response = await fetch(`http://localhost:8080/api/chat/${role}`, {
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
            }
        }
    };

    const handleConfirm = () => {
        if (!selectedDate || !selectedTimeSlot) {
            setError("Please select both a date and a time slot."); // 设置错误消息
            return;
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Appointment confirmed for date: ${selectedDate}, time slot: ${selectedTimeSlot}`, isUser: false },
        ]);
        setShowTimePicker(false);
        setSelectedDate("");
        setSelectedTimeSlot("");
        setError(""); // 清空错误消息
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
        <div className="flex h-screen bg-gray-100">
            <div className="w-64 bg-orange-800 text-white p-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xl font-bold">Sydney Uni Chat</h1>
                    <button className="p-1 rounded-full hover:bg-orange-700 transition-colors duration-200">
                        <Menu size={24} />
                    </button>
                </div>
                <nav className="space-y-4">
                    {[
                        { icon: Home, text: 'Home', to: '/home' },
                        { icon: Users, text: 'My Team', to: '/team' },
                        { icon: MessageCircle, text: 'Contact', to: '/contact' },
                        { icon: CircleCheckBig, text: 'Appointment', to: '/appointment' },
                        { icon: Newspaper, text: 'HealthNews', to: '/healthnews' },
                    ].map(({ icon: Icon, text, to }) => (
                        <Link key={text} to={to} className="flex items-center p-2 rounded-lg hover:bg-orange-700 transition-colors duration-200">
                            <Icon className="mr-3" size={20} />
                            {text}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex-1 flex flex-col bg-gray-50">
                <div className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-orange-800">Chat Room</h2>
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-bold">
                            U
                        </div>
                        <Link to="/login" className="flex items-center text-gray-600 hover:text-orange-800 transition-colors duration-200">
                            <LogOut className="mr-2" size={20} />
                            Logout
                        </Link>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-1/5 opacity-5">
                            <SydneyUniLogo />
                        </div>
                    </div>

                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs rounded-lg px-4 py-2 shadow-sm ${msg.isUser ? 'bg-orange-600 text-white' : 'bg-white text-gray-800'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="max-w-xs rounded-lg px-4 py-2 shadow-sm bg-white text-gray-800">
                                Typing...
                            </div>
                        </div>
                    )}

                    {showTimePicker && (
                        <div className="flex justify-center mt-4">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-lg font-semibold">Select Appointment Time</h2>
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
                                                className={`border rounded py-2 px-4 ${selectedTimeSlot === timeSlot ? 'bg-orange-600 text-white' : 'bg-gray-200 hover:bg-orange-500 hover:text-white'}`}
                                            >
                                                {timeSlot}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {error && ( // 显示错误消息
                                    <div className="text-red-600 mt-2">
                                        {error}
                                    </div>
                                )}

                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800"
                                        onClick={handleConfirm}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={sendMessage} className="p-4 bg-white border-t">
                    <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-3 bg-transparent focus:outline-none"
                        />
                        <button type="submit" className="bg-orange-700 text-white p-3 rounded-full hover:bg-orange-800 transition-colors duration-200">
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MainLayout;


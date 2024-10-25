import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
    const bubbleStyle = isUser
        ? `bg-blue-500 text-white justify-end`  // 用户消息样式
        : `bg-gray-300 text-black justify-start`;  // AI 消息样式

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-1`}>
            <div className={`max-w-xs mx-2 p-2 rounded-lg ${bubbleStyle}`}>
                {message}
            </div>
        </div>
    );
};

const ChatWithAi = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isUser: false },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false); // 新增：控制时间选择窗口显示
    const [selectedDate, setSelectedDate] = useState(""); // 新增：选择的日期
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(""); // 新增：选择的时间
    const [error, setError] = useState(""); // 新增：错误信息

    const sendMessage = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, isUser: true },  // 用户消息
            ]);

            // 检测是否是预约关键词
            if (input.toLowerCase().includes("appointment") || input.toLowerCase().includes("reservation")) {
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
                    { text: data.response, isUser: false },  // AI 回复
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

    // 确认时间选择
    const handleConfirm = () => {
        if (!selectedDate || !selectedTimeSlot) {
            setError("Please select both a date and a time slot.");
            return;
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Appointment confirmed for date: ${selectedDate}, time slot: ${selectedTimeSlot}`, isUser: false },
        ]);
        setShowTimePicker(false);
        setSelectedDate("");
        setSelectedTimeSlot("");
        setError("");
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
            </div>

            {showTimePicker && (
                <div className="p-4 bg-white border-t">
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

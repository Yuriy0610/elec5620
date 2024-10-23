import React from 'react';
import { useLocation } from 'react-router-dom';

const AiResponseSymptomChecker = () => {
    const location = useLocation();
    const { formData, llmResponse } = location.state || {}; // 获取传递过来的表单数据和AI回复

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="w-full max-w-5xl p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold text-orange-800 mb-4 text-center">AI Response</h1>
                <div className="text-lg text-gray-700">
                    <h2 className="font-semibold">Symptoms You Reported:</h2>
                    <ul className="list-disc ml-6 mb-4">
                        {Object.keys(formData).map((symptom) => {
                            if (formData[symptom].hasSymptom) {
                                return (
                                    <li key={symptom}>
                                        {symptom}: {formData[symptom].duration} days, Severity {formData[symptom].severity}
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                    <h2 className="font-semibold">AI's Advice:</h2>
                    <p>{llmResponse}</p>
                </div>
            </div>
        </div>
    );
};

export default AiResponseSymptomChecker;
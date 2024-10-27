import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useUser } from './UserContext';

const SymptomChecker = () => {
  const [formData, setFormData] = useState({
    fever: { hasSymptom: false, duration: '', severity: '' },
    headache: { hasSymptom: false, duration: '', severity: '' },
    cough: { hasSymptom: false, duration: '', severity: '' },
    soreThroat: { hasSymptom: false, duration: '', severity: '' },
    fatigue: { hasSymptom: false, duration: '', severity: '' },
    musclePain: { hasSymptom: false, duration: '', severity: '' },
    shortnessOfBreath: { hasSymptom: false, duration: '', severity: '' },
    lossOfTasteSmell: { hasSymptom: false, duration: '', severity: '' },
    nausea: { hasSymptom: false, duration: '', severity: '' },
    diarrhea: { hasSymptom: false, duration: '', severity: '' },
    additionalInfo: '', // Additional text input
  });

  const [validationMessages, setValidationMessages] = useState({});
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [aiResponseVisible, setAiResponseVisible] = useState(false);
  const [llmResponse, setLlmResponse] = useState('');

  const handleChange = (e, symptom) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [symptom]: {
        ...prev[symptom],
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
    // Reset validation message for the field on change
    setValidationMessages((prev) => ({
      ...prev,
      [symptom]: { ...prev[symptom], [name]: '' },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messages = {};
    const symptomsSelected = Object.values(formData).some(symptom => symptom.hasSymptom);

    // Check for additional information
    if (!symptomsSelected && !formData.additionalInfo.trim()) {
        messages.additionalInfo = 'Please select at least one symptom or provide additional information.';
    }

    for (const symptom of Object.keys(formData)) {
        if (formData[symptom].hasSymptom) {
            if (formData[symptom].duration <= 0) {
                messages[symptom] = {
                    ...messages[symptom],
                    duration: `${symptom} duration must be a positive number.`,
                };
            }
            if (formData[symptom].severity < 1 || formData[symptom].severity > 5) {
                messages[symptom] = {
                    ...messages[symptom],
                    severity: `${symptom} severity must be between 1 and 5.`,
                };
            }
        }
    }

    setValidationMessages(messages);

    // Stop submission if there are validation messages
    if (Object.keys(messages).length > 0) {
        return;
    }

    setLoading(true);
    try {
        // Construct the chat message
        const chatMessage = Object.keys(formData)
            .filter(symptom => formData[symptom].hasSymptom)
            .map(symptom => {
                const { duration, severity } = formData[symptom];
                return `${symptom} (Duration: ${duration} days, Severity: ${severity})`;
            })
            .join(', ');

        const additionalInfo = formData.additionalInfo.trim();
        const messageToSend = additionalInfo ? `${chatMessage}; Additional Information: ${additionalInfo}` : chatMessage;

        console.log("Sending message:", messageToSend); // Debug log

        // First API call to your existing endpoint
        const response = await fetch('http://localhost:8080/api/get/doctor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageToSend }),
        });

        if (!response.ok) throw new Error(await response.text());

        const result = await response.json();
        setLlmResponse(result.response);
        setAiResponseVisible(true);

        // Second API call to save the chat
        const saveChatResponse = await fetch(`http://localhost:8080/api/chats/create/${user.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat: messageToSend }),
        });

        if (!saveChatResponse.ok) throw new Error(await saveChatResponse.text());

        // Optionally handle the response from the save chat API if needed
        const saveChatResult = await saveChatResponse.json();
        console.log("Chat saved:", saveChatResult);

    } catch (error) {
        console.error('Error occurred while submitting the form:', error);
    } finally {
        setLoading(false);
    }
};

  const renderSymptomInput = (symptom, label) => (
    <div className="p-4 bg-orange-50 rounded-lg shadow-md rounded-md">
      <label className="block text-lg font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          name="hasSymptom"
          checked={formData[symptom].hasSymptom}
          onChange={(e) => handleChange(e, symptom)}
          className="mr-2 h-5 w-5 text-orange-600 border-gray-300 focus:ring-orange-500"
        />
        <label className="text-sm text-gray-600">Have this symptom?</label>
      </div>
      {formData[symptom].hasSymptom && (
        <div className="space-y-2">
          <input
            type="number"
            name="duration"
            value={formData[symptom].duration}
            onChange={(e) => handleChange(e, symptom)}
            placeholder="Duration (in days)"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {/* Duration Validation Message */}
          {validationMessages[symptom]?.duration && (
            <p className="text-sm text-red-500">{validationMessages[symptom].duration}</p>
          )}
          <select
            name="severity"
            value={formData[symptom].severity}
            onChange={(e) => handleChange(e, symptom)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-700 hover:bg-gray-50"
          >
            <option value="" disabled>Select Severity (1-5)</option>
            <option value="1">1 - Mild</option>
            <option value="2">2</option>
            <option value="3">3 - Moderate</option>
            <option value="4">4</option>
            <option value="5">5 - Severe</option>
          </select>
          {/* Severity Validation Message */}
          {validationMessages[symptom]?.severity && (
            <p className="text-sm text-red-500">{validationMessages[symptom].severity}</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-orange-50 rounded-lg flex items-center justify-center">
      <div className="w-full max-w-5xl p-8 bg-white shadow-lg rounded-lg">
        {aiResponseVisible ? (
          <div className="text-lg text-gray-700">
            <h1 className="text-4xl font-bold text-orange-800 mb-4 text-center">Here is my analysis:</h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {llmResponse}
            </ReactMarkdown>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-orange-800 mb-2 text-center">Symptom Checker</h1>
            <p className="text-base text-gray-500 mb-8 text-center">
              Do you have any of the following symptoms? If yes, please check the box.
            </p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderSymptomInput('fever', 'Fever')}
              {renderSymptomInput('headache', 'Headache')}
              {renderSymptomInput('cough', 'Cough')}
              {renderSymptomInput('soreThroat', 'Sore Throat')}
              {renderSymptomInput('fatigue', 'Fatigue')}
              {renderSymptomInput('musclePain', 'Muscle Pain')}
              {renderSymptomInput('shortnessOfBreath', 'Shortness of Breath')}
              {renderSymptomInput('lossOfTasteSmell', 'Loss of Taste/Smell')}
              {renderSymptomInput('nausea', 'Nausea')}
              {renderSymptomInput('diarrhea', 'Diarrhea')}
            </form>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg shadow-md rounded-md">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Additional Information</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleChange(e, 'additionalInfo')}
                placeholder="Please provide any other relevant information..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {/* Additional Info Validation Message */}
              {validationMessages.additionalInfo && (
                <p className="text-sm text-red-500">{validationMessages.additionalInfo}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-8 w-full py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Symptoms'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;

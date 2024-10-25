import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm'; // Import remark-gfm for GitHub Flavored Markdown

const SymptomChecker = () => {
  const [formData, setFormData] = useState({
    fever: { hasSymptom: false, duration: '', severity: '' },
    headache: { hasSymptom: false, duration: '', severity: '' },
    cough: { hasSymptom: false, duration: '', severity: '' },
    shortnessOfBreath: { hasSymptom: false, duration: '', severity: '' },
    abdominalPain: { hasSymptom: false, duration: '', severity: '' },
    indigestion: { hasSymptom: false, duration: '', severity: '' },
    chestPain: { hasSymptom: false, duration: '', severity: '' },
    fatigue: { hasSymptom: false, duration: '', severity: '' },
    jointPain: { hasSymptom: false, duration: '', severity: '' },
    muscleSoreness: { hasSymptom: false, duration: '', severity: '' },
    additionalInfo: '', // Additional text input
  });

  const [loading, setLoading] = useState(false);
  const [aiResponseVisible, setAiResponseVisible] = useState(false);
  const [llmResponse, setLlmResponse] = useState(''); // To hold the AI's response

  const handleChange = (e, symptom) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [symptom]: {
        ...prev[symptom],
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleAdditionalChange = (e) => {
    setFormData({ ...formData, additionalInfo: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    for (const symptom of Object.keys(formData)) {
      if (formData[symptom].hasSymptom) {
        if (formData[symptom].duration <= 0) {
          alert(`${symptom} duration must be a positive number.`);
          return;
        }
        if (formData[symptom].severity < 1 || formData[symptom].severity > 5) {
          alert(`${symptom} severity must be between 1 and 5.`);
          return;
        }
      }
    }
    
    console.log('Submitted symptoms and additional info:', formData);
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:8080/api/get/doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: JSON.stringify(formData),
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Capture the response message
        throw new Error(errorMessage || 'Failed to submit symptoms');
      }
  
      const result = await response.json();
      console.log('AI Advice:', result);
  
      setLlmResponse(result.response);
      setAiResponseVisible(true);
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred: ${error.message || 'please try again.'}`);
    } finally {
      setLoading(false);
    }
  };
  

  const renderSymptomInput = (symptom, label) => (
    <div className="p-4 bg-white shadow-md rounded-md">
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
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-full max-w-5xl p-8 bg-white shadow-lg rounded-lg">
        {aiResponseVisible ? (
          <div className="text-lg text-gray-700">
            <h1 className="text-4xl font-bold text-orange-800 mb-4 text-center">Here is my analysis:</h1>
            <h2 className="font-semibold">Symptoms You Reported:</h2>
            <ul className="list-disc ml-6 mb-4">
              {Object.keys(formData).map((symptom) => {
                if (formData[symptom].hasSymptom) {
                  return (
                    <li key={symptom}>
                      <strong>{symptom}:</strong> {formData[symptom].duration} days, Severity {formData[symptom].severity}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            <h2 className="font-semibold">My Advice:</h2>
            {/* Render the AI's advice using ReactMarkdown */}
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
              {renderSymptomInput('shortnessOfBreath', 'Shortness of Breath')}
              {renderSymptomInput('abdominalPain', 'Abdominal Pain')}
              {renderSymptomInput('indigestion', 'Indigestion')}
              {renderSymptomInput('chestPain', 'Chest Pain')}
              {renderSymptomInput('fatigue', 'Fatigue')}
              {renderSymptomInput('jointPain', 'Joint Pain')}
              {renderSymptomInput('muscleSoreness', 'Muscle Soreness')}
            </form>

            {/* Additional Information Input */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <textarea
                value={formData.additionalInfo}
                onChange={handleAdditionalChange}
                placeholder="Please provide any additional information here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
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

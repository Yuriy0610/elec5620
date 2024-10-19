import React, { useState } from 'react';

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
    additionalInfo: '', // 补充框
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted symptoms and additional info:', formData);
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
          {/* 去掉数字输入框的箭头 */}
          <input
            type="number"
            name="duration"
            value={formData[symptom].duration}
            onChange={(e) => handleChange(e, symptom)}
            placeholder="Duration (in days)"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
          />

          {/* Severity 下拉框美化 */}
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
        {/* 标题部分 */}
        <h1 className="text-4xl font-bold text-orange-800 mb-2 text-center">Symptom Checker</h1>
        
        {/* 提示语部分 */}
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

        {/* Common Questions Section */}
        <div className="mt-8 p-6 bg-gray-50 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Common Questions</h3>
          <ul className="space-y-4">
            <li>Have you experienced a sudden onset of symptoms?</li>
            <li>Do you have a family history of these symptoms?</li>
            <li>Have you been exposed to any known illnesses recently?</li>
            <li>Do you have any pre-existing health conditions?</li>
          </ul>
        </div>

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
          type="submit"
          className="mt-8 w-full py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-colors duration-200"
          onClick={handleSubmit}
        >
          Submit Symptoms
        </button>
      </div>
    </div>
  );
};

export default SymptomChecker;
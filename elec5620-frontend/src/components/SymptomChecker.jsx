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

  const [loading, setLoading] = useState(false); // 添加loading状态
  const [aiResponseVisible, setAiResponseVisible] = useState(false); // 控制是否显示AI回复
  const [llmResponse, setLlmResponse] = useState(''); // 保存LLM的回复

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
    console.log('Submitted symptoms and additional info:', formData);
    setLoading(true); // 设置加载状态为true

    try {
      const role = 'doctor'; // 假设角色是医生，您可以根据需要更改角色
      const response = await fetch('http://localhost:8080/api/chat/doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: JSON.stringify(formData), // 将症状数据作为 message 发送
        }),
      });

      if (!response.ok) {
        throw new Error('提交症状信息失败');
      }

      const result = await response.json();
      console.log('LLM 建议:', result);

      // 设置LLM回复并切换到AI回复页面
      setLlmResponse(result.response);
      setAiResponseVisible(true); // 显示AI的建议
    } catch (error) {
      console.error('错误:', error);
      alert('提交过程中出现问题，请稍后再试。');
    } finally {
      setLoading(false); // 重置加载状态
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
        {aiResponseVisible ? (
          <div className="text-lg text-gray-700">
            <h1 className="text-4xl font-bold text-orange-800 mb-4 text-center">AI Response</h1>
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
              disabled={loading}  // 禁用按钮以防止多次点击
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
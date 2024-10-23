import { useEffect, useState } from 'react'; // 删除 React 导入

const HealthNews = () => {
    const [newsResponse, setNewsResponse] = useState([]); // 存储新闻
    const [loading, setLoading] = useState(true); // 加载状态
    const [error, setError] = useState(null); // 错误状态

    // 页面加载时自动请求新闻
    useEffect(() => {
        const fetchHealthNews = async () => {
            setLoading(true);
            setError(null);

            try {
                const role = "news_reporter"; // API 角色
                const response = await fetch(`http://localhost:8080/api/chat/${role}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: "Give me the latest health news." }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // 格式化响应内容
                const formattedResponse = data.response
                    .split('\n')
                    .filter((line) => line.trim() !== '');

                setNewsResponse(formattedResponse);
            } catch (err) {
                setError(err.message); // 捕获并显示错误信息
            } finally {
                setLoading(false); // 停止加载状态
            }
        };

        fetchHealthNews(); // 执行请求函数并忽略返回的 Promise
    }, []);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-400 p-10"
            style={{ backgroundImage: `url('https://via.placeholder.com/1920x1080')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-lg overflow-hidden">
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-center mb-6 text-indigo-900">
                        Health News 📰
                    </h1>

                    {loading && (
                        <p className="text-center text-lg font-medium text-gray-700">
                            Loading health news...
                        </p>
                    )}

                    {error && (
                        <p className="text-center text-red-600 font-semibold">
                            Error: {error}
                        </p>
                    )}

                    {newsResponse.length > 0 && (
                        <div className="space-y-6">
                            {newsResponse.map((line, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <p className="text-lg text-gray-800">{line}</p>
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

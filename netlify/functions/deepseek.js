// 这是后端函数，API密钥放在这里很安全
exports.handler = async (event) => {
    // 只接受POST请求
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // 获取前端发来的问题
    const { message } = JSON.parse(event.body);

    // 调用DeepSeek API（密钥从环境变量读取）
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: message }],
        }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '没有回复';

    return {
        statusCode: 200,
        body: JSON.stringify({ reply: reply }),
    };
};

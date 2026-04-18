// api/deepseek.js
// 这是后端函数，API密钥放在这里很安全

export default async function handler(req, res) {
    // 只接受POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 获取前端发来的问题
    const { message } = req.body;

    try {
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

        res.status(200).json({ reply: reply });
    } catch (error) {
        res.status(500).json({ error: '调用DeepSeek失败' });
    }
}

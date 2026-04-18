// api/deepseek.js
export default async function handler(req, res) {
    // 设置允许跨域（如果你的前端和API在不同域名）
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理预检请求
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 只接受POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 获取前端传来的 User-Agent
    const { userAgent } = req.body;

    try {
        // 安全地调用 DeepSeek API（密钥从环境变量读取，不会暴露给前端）
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,  // ✅ 密钥在服务器端
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ 
                    role: 'user', 
                    content: '分析User-Agent，只返回品牌英文小写：' + userAgent 
                }],
                temperature: 0,
                max_tokens: 8
            }),
        });

        const data = await response.json();
        let brand = data.choices[0].message.content.trim().toLowerCase();
        brand = brand.replace(/[^a-z]/g, '');
        
        return res.status(200).json({ brand: brand || 'unknown' });
        
    } catch (error) {
        console.error('DeepSeek调用失败:', error);
        return res.status(500).json({ brand: 'unknown', error: 'API调用失败' });
    }
}

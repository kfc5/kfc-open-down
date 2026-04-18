// netlify/functions/deepseek-proxy.js

// 处理所有发送到此函数的请求
exports.handler = async (event, context) => {
  // 1. 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // 2. 解析前端传来的消息
  const { message } = JSON.parse(event.body);

  try {
    // 3. (安全核心) 在后端调用 DeepSeek API，API Key 通过环境变量读取，不会暴露给前端
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`, // 密钥在这里安全地使用
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();

    // 4. 将 DeepSeek 的回复返回给前端
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch from DeepSeek' }),
    };
  }
};

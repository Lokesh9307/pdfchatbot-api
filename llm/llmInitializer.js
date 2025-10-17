const axios = require('axios');
require('dotenv').config();

async function generateAnswer(question, contextChunks) {
  const context = contextChunks.join('\n\n');
  const prompt = `
Context:
${context}

Question:
${question}

Answer clearly based only on the context.
  `;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'openai/gpt-oss-20b', // or correct model ID from Groq
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Groq API Error:', JSON.stringify(error.response?.data, null, 2));
    throw new Error(error.response?.data?.error?.message || 'Groq API request failed');
  }
}

module.exports = { generateAnswer };

const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
console.log("ENV FILE CONTENTS:", Object.keys(process.env).filter(k => k.includes('ROUTER')));
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

if (!process.env.OPENROUTER_API_KEY) {
  console.error('ERROR: OPENROUTER_API_KEY is missing in environment variables');
} else {
  console.log('API key found with length:', process.env.OPENROUTER_API_KEY.length);
}

app.use(express.json());
app.use(cors());

app.post('/api/ai/ask', async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173', // Updated to match Vite's default port
        'X-Title': 'MINIMIND' // Required by OpenRouter
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    
    console.log('API Response status:', response.status);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenRouter API error:', data);
      throw new Error(data.error?.message || 'API request failed');
    }
    
    console.log('API Response structure:', Object.keys(data));
    res.json(data);
  } catch (err) {
    console.error('AI request error:', err);
    res.status(500).json({ error: 'AI request failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI backend server running on port ${PORT}`);
}); 
const OpenAI = require('openai');
const logger = require('../config/logger');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateCompletion = async (prompt, systemMessage = 'You are a helpful assistant.') => {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });
    return response.choices[0].message.content;
  } catch (err) {
    logger.error({ message: 'AI generation failed', error: err.message });
    throw err;
  }
};

const generateEmbeddings = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data;
  } catch (err) {
    logger.error({ message: 'Embedding generation failed', error: err.message });
    throw err;
  }
};

module.exports = { generateCompletion, generateEmbeddings };

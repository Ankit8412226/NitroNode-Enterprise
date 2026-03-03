const pdf = require('pdf-parse');
const { generateEmbeddings, generateCompletion } = require('./ai.service');
const logger = require('../config/logger');

const processDocument = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (err) {
    logger.error({ message: 'Document processing failed', error: err.message });
    throw err;
  }
};

const queryRAG = async (query, contextSegments) => {
  const context = contextSegments.join('\n\n');
  const prompt = `
    Use the provided context to answer the user's question accurately.
    If the context doesn't contain the answer, say "I don't have enough information."

    Context:
    ${context}

    Question: ${query}
  `;
  return generateCompletion(prompt, 'You are a precise RAG assistant.');
};

module.exports = {
  processDocument,
  queryRAG,
};

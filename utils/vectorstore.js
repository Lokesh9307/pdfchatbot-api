const axios = require('axios');

const VECTOR_SERVICE_URL = process.env.VECTOR_SERVICE_PORT_HOST_URL;

async function storePDFTextAsVectors(chunks) {
    if (!Array.isArray(chunks)) throw new Error("Chunks must be an array of text.");

    await axios.post(`${VECTOR_SERVICE_URL}/add_chunks`, { chunks });
}

async function retrieveRelevantChunks(query) {
    const response = await axios.post(`${VECTOR_SERVICE_URL}/search`, {
        query,
        top_k: 3
    });

    if (!response.data.results || !Array.isArray(response.data.results)) {
        throw new Error('Invalid response from vector store API');
    }

    return response.data.results;
}

module.exports = {
    storePDFTextAsVectors,
    retrieveRelevantChunks
};

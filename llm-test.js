const { VertexAI } = require('@google-cloud/vertexai');
const { GoogleAuth } = require('google-auth-library');

// Initialize Vertex
// TODO determine that auth is working as I expect on a machine not logged into googlecli
// google auth automatically reads GOOGLE_APPLICATION_CREDENTIALS from .env file
const vertex_ai = new VertexAI({
    project: process.env.PROJECT_ID,
    location: 'us-central1',
    googleAuthOptions: new GoogleAuth(),
});
const model = 'gemini-1.5-flash-preview-0514';
const generationConfig = {
    maxOutputTokens: 128,
    temperature: 0.2,
    topP: 0.95,
};
const safetySettings = [
    {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
];

// Instantiate the model
const generativeModel = vertex_ai.preview.getGenerativeModel({
    model,
    generationConfig,
    safetySettings,
});

async function getSentimentAnalysis(subject, text) {
    const req = {
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: `Only print \'positive\', \'negative\', \'neutral\' or \'unknown\'.
                            input: Classify the sentiment of the message \"${text}\" in regards to ${subject}.
                        `,
                    },
                ],
            },
        ],
    };

    try {
        const response = await generativeModel.generateContent(req);
        console.log(`response for: ${text}`);
        console.log(response.response.candidates[0].content.parts[0].text);
    } catch (error) {
        console.log('error making call');
        console.log(error);
    }
}

getSentimentAnalysis('oranges', 'Oranges are not the front end solution we need');
getSentimentAnalysis('oranges', 'Oranges now available on mac.');
getSentimentAnalysis('oranges', 'The unreasonable effectivness of oranges.');
// expected output: negative, nuetral, positive

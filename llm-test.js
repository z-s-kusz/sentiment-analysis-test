import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getSentimentAnalysis(subject, text) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: "Only print 'positive', 'negative', or 'neutral'." },
                {
                    role: 'user',
                    content: `Classify the sentiment of the message \"${text}\" in regards to ${subject}.`,
                },
            ],
            model: 'gpt-3.5-turbo',
        });

        console.log('response for: ' + text);
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.log('error making call');
        console.log(error);
    }
}

getSentimentAnalysis('oranges', 'Oranges are not the front end solution we need');
getSentimentAnalysis('oranges', 'Oranges now available on mac.');
getSentimentAnalysis('oranges', 'The unreasonable effectivness of oranges.');
// expected output: negative, nuetral, positive

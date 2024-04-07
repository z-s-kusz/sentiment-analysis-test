const natural = require('natural');
const stemmer = natural.PorterStemmer;
const analyzer = new natural.SentimentAnalyzer('English', stemmer, 'pattern');
const tokenizer = new natural.WordTokenizer();

const testCases = {
    easyPositive: ['Oranges helped me 10x my workflow'],
    toughPositive: ['Oranges: improving my workflow', 'Oranges are better than apples'],
    easyNegative: ['Orange puts email at risk', 'Oranges suck and I hate them'],
    toughNegative: ['Migrating away from oranges', 'Apples are better than oranges.'],
    neutral: ['Oranges: An open source tool for fact verification'],
};

const results = [];

Object.keys(testCases).forEach((key) => {
    testCases[key].forEach((testText) => {
        const tokenizedText = tokenizer.tokenize(testText);
        const sentiment = analyzer.getSentiment(tokenizedText);
        results.push(sentiment);
    });
});

console.log('Results:');
console.log(results);

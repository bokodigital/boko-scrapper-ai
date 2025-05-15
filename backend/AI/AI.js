const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.GROK_API_KEY,
    baseURL: "https://api.x.ai/v1",
});

const GrokInit = async (content, prompt) => {
    const completion = await client.chat.completions.create({
        model: "grok-2-latest",
        messages: [
            {
                role: "system",
                content: content
            },
            {
                role: "user",
                content:prompt
            },
        ],
    });
    return completion.choices[0].message
}


const AiDataGetter = async (content, prompt) => {
    try {
        const response = await GrokInit(content, prompt);
        return response
    }
    catch (error) {
        console.error('Error:', error);
    }
}


module.exports = { AiDataGetter }   
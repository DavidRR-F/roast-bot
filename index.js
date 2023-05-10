import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const org = process.env.CHAT_GPT_ORG;
const key = process.env.CHAT_GPT_API_KEY;

const configuration = new Configuration({organization: org, apiKey: key})

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

    const { messages } = req.body;

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a rude discord chatbot. That insults the user"
            },
            ...messages
        ]
    });
    res.json({
        completion: completion.data.choices[0].message
    });
});

app.listen(port, () => {
    console.log(`App Listening on http://localhost${port}`);
});
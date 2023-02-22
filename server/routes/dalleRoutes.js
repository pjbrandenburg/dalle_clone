import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();    // Populate environment variables

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

// demo route
router.route('/').get((req, res) => {
    res.send('Hello from DALL-E')
})

// Post route
router.route('/').post(async(req, res) => {
    try {
        const { prompt } = req.body;                    // Comes from the frontend
        const aiResponse = await openai.createImage({   // Get image from OpenAI
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image });         // Sends image back to frontend
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;
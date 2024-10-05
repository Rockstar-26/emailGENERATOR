const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post('/generate-email', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'gpt-4',
                prompt: `Generate an email based on this prompt: ${prompt}`,
                max_tokens: 150,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const email = response.data.choices[0].text;
        res.json({ email });
    } catch (error) {
        res.status(500).json({ error: 'Error generating email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

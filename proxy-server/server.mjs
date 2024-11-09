import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();


const PLAY_HT_API_URL = 'https://api.play.ht/api/v2/tts/stream';
const USER_ID = '7ycPSfcV7lOuigU27O4bWoOCA8y1';
const API_KEY = 'f6a3650038b04a0e8e617ca618c58ced';

app.use(cors());
app.use(express.json());

app.post('/generate-audio', async (req, res) => {
  const { text, language } = req.body;
  const headers = {
    'X-USER-ID': USER_ID,
    'AUTHORIZATION': API_KEY,
    'accept': 'audio/mpeg',
    'content-type': 'application/json'
  };

  const body = JSON.stringify({
    text: text || "Bonjour! Comment puis-je vous aider aujourd'hui?",
    voice_engine: 'Play3.0',
    voice: 's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json',
    output_format: 'mp3',
    speed: 0.7,
    language: language || 'french'
  });

  console.log(body, text, language);

  try {
    const response = await fetch(PLAY_HT_API_URL, {
      method: 'POST',
      headers: headers,
      body: body
    });

    // Log the response status
    console.log(`API Response Status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error Response: ${errorText}`);
      throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
    }

    // Use arrayBuffer instead of buffer
    const audioArrayBuffer = await response.arrayBuffer();
    const audioBuffer = Buffer.from(audioArrayBuffer);

    res.set('Content-Type', 'audio/mpeg');
    res.send(audioBuffer);
  } catch (error) {
    console.error('Error generating French audio:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

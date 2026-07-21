const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');

const app = express();
// Allow your Vercel site to talk to this server
app.use(cors());

// The magic audio routing endpoint
app.get('/stream', (req, res) => {
    const videoId = req.query.id;
    if (!videoId) {
        return res.status(400).send('No video ID provided');
    }

    try {
        // This takes the YouTube video and pipes only the raw audio back to your app
        const stream = ytdl(videoId, { filter: 'audioonly', quality: 'highestaudio' });
        stream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error extracting audio stream');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Shinzi backend running on port ${PORT}`);
});


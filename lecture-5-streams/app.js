import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/image-with-streams/:imageName', (req, res) => {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, 'images', imageName);
    const stream = fs.createReadStream(imagePath);

    stream.pipe(res);
});

app.get('/video-with-streams/:fileName', (req, res) => {
    const { fileName } = req.params;
    const videoPath = path.join(__dirname, 'videos', fileName);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
});

app.post('/upload', (req, res) => {
    const fileName = req.headers['file-name'];

    if (!fileName) {
        return res.status(400).send('File name is required.');
    }

    const filePath = path.join(__dirname, fileName);

    // Create a write stream to save the file
    const fileStream = fs.createWriteStream(filePath);

    req.pipe(fileStream);

    req.on('end', () => {
        res.status(200).send('File uploaded successfully');
    });

    req.on('error', (err) => {
        console.error(err);
        res.status(500).send('File upload failed');
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

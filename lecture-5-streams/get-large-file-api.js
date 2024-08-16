// --max-old-space-size=64

import 'dotenv/config'
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();

const PORT = process.env.PORT;

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/large-file', (req, res) => {
    const filePath = path.join(__dirname, 'large_file.csv');
    const file = fs.readFileSync(filePath);

    res.status(200).send(file);
});

app.get('/large-file-streams', (req, res) => {
    const filePath = path.join(__dirname, 'large_file.csv');
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    fs.createReadStream(filePath);

    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
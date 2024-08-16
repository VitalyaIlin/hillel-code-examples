import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__dirname', path.join(__dirname, 'images', 'myimage.png'));
// const filePath = path.join(__dirname, 'images', 'sm-image.png');
// const file = fs.readFileSync(filePath);

// const buffer1 = Buffer.from('Hello, world1!');
// const buffer2 = Buffer.from('Hello, world12!');
// console.log(Buffer.compare(buffer1, buffer2));

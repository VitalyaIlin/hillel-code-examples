import { readFile, readFileSync } from 'fs';


readFile('file-example.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
    }
    console.log(data);
});




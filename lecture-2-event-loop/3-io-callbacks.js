const fs = require('fs');

console.log('Start');

setTimeout(() => {
    console.log('Timeout 1');

    fs.readFile(__filename, () => {
        console.log('File Read Completed');
    });
}, 0);

setTimeout(() => {
    console.log('Timeout 2');
}, 1000);

console.log('End');

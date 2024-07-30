const fs = require('fs');

console.log('Start');

fs.readFile(__filename, () => {
    console.log('File Read Completed');
});

setTimeout(() => {
    console.log('Timeout');
}, 0);

console.log('End');

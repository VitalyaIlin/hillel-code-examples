const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('File Read');

  setTimeout(() => {
    console.log('Timeout');
  }, 0);

  setImmediate(() => {
    console.log('Immediate');
  });
});

console.log('Start');
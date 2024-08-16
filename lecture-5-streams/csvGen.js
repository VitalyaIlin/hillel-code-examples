import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the file path
const filePath = path.join(__dirname, 'large_file.csv');

// Create a write stream
const writeStream = fs.createWriteStream(filePath);

// Define the number of rows and columns
const numRows = 10 * 10**6; // 10 million rows
const numColumns = 100; // 100 columns

// Function to generate a single row of CSV data
function generateRow() {
    const row = [];
    for (let i = 0; i < numColumns; i++) {
        row.push(Math.random().toFixed(6));
    }
    return row.join(',') + '\n';
}

// Write header row
const header = Array.from({ length: numColumns }, (_, i) => `col_${i}`).join(',') + '\n';
writeStream.write(header);

// Function to write the data to the file
function writeData() {
    let i = 0;

    function write() {
        let ok = true;
        while (i < numRows && ok) {
            const row = generateRow();
            ok = writeStream.write(row); // Write the row
            i++;
        }
        if (i < numRows) {
            writeStream.once('drain', write);
        } else {
            writeStream.end();
            console.log('CSV file generation completed');
        }
    }

    write();
}

// Start writing data
writeData();

writeStream.on('error', (err) => {
    console.error('Error writing file:', err);
});

writeStream.on('finish', () => {
    console.log('Finished writing to the file:', filePath);
});

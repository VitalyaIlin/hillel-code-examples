import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = path.join(__dirname, 'images', 'image.jpg');
const outputImagePath =  path.join(__dirname, 'images', 'cropped_image.jpg');

// Define the cropping region
const cropWidth = 100;
const cropHeight = 100;
const cropX = 0;
const cropY = 0;

fs.readFile(imagePath, (err, data) => {
    if (err) throw err;

    sharp(data)
        .raw()
        .ensureAlpha() // Ensure that the image has an alpha channel
        .toBuffer({ resolveWithObject: true })
        .then(({ data: rawData, info }) => {
            console.log('rawData', Buffer.isBuffer(rawData));
            const bytesPerPixel = info.channels; // Get the number of channels (3 for RGB, 4 for RGBA)
            const originalWidth = info.width;

            // Calculate the size of the cropped buffer
            const croppedBufferSize = cropWidth * cropHeight * bytesPerPixel;
            const croppedBuffer = Buffer.alloc(croppedBufferSize);

            // Copy the cropped region into the new buffer
            for (let row = 0; row < cropHeight; row++) {
                const originalRowStart = ((cropY + row) * originalWidth + cropX) * bytesPerPixel;
                const cropRowStart = row * cropWidth * bytesPerPixel;

                // Copy one row of pixels from the original image to the cropped buffer
                rawData.copy(croppedBuffer, cropRowStart, originalRowStart, originalRowStart + cropWidth * bytesPerPixel);
            }

            // Step 2: Use sharp to save the cropped buffer as JPG
            sharp(croppedBuffer, {
                raw: {
                    width: cropWidth,
                    height: cropHeight,
                    channels: bytesPerPixel
                }
            })
                .toFormat('jpeg')
                .toFile(outputImagePath, (err, info) => {
                    if (err) throw err;
                    console.log('Cropped image saved as JPG:', info);
                });
        })
        .catch((err) => {
            console.error('Error processing image:', err);
        });
});

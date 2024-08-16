import { Readable, Writable, Transform } from 'stream';

// Create a custom Readable stream that generates some data
class CustomReadable extends Readable {
  constructor(options) {
    super(options);
    this.data = ['hello', 'world', 'this', 'is', 'a', 'test'];
    this.index = 0;
  }

  _read() {
    if (this.index < this.data.length) {
      // Push the current chunk of data
      console.log(`Reading: ${this.data[this.index]}`);
      this.push(this.data[this.index]);
      this.index += 1;
    } else {
      // No more data, end the stream
      this.push(null);
    }
  }
}

// Create a custom Transform stream that converts data to uppercase
class UppercaseTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const transformedChunk = chunk.toString().toUpperCase();
    console.log(`Transforming: ${transformedChunk}`);
    this.push(transformedChunk);
    callback();
  }
}

// Create a custom Writable stream that outputs the transformed data
class CustomWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    console.log(`Writing: ${chunk.toString()}`);
    callback();
  }
}

// Create instances of the custom streams
const customReadable = new CustomReadable();
const uppercaseTransform = new UppercaseTransform();
const customWritable = new CustomWritable();

// Pipe the streams together: Readable -> Transform -> Writable
customReadable.pipe(uppercaseTransform).pipe(customWritable);

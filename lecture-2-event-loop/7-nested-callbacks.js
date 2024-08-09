const { readFile, writeFile } = require("fs");

console.log('Start');

setTimeout(() => {
    console.log('setTimeout');

    Promise.resolve().then(() => {
        console.log('Hello from the nested Promise');
    });

    process.nextTick(() => {
        console.log('nextTick 2');
    });
}, 0);

process.nextTick(() => {
    console.log('nextTick 1');
});

console.log('End');

1. синхронні задачі 
2. асинхронні


1. nextTick
2. microtask - Promise
3. macrotask - setTimeout, setInterval, setImmediate, readFile, writeFile, call to the external api


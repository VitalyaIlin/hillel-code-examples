console.log('Start');

Promise.resolve().then(() => {
    console.log('Promise');
});

process.nextTick(() => {
    console.log('nextTick');
});

console.log('End');

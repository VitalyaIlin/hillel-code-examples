console.log('Start');

process.nextTick(() => {
    console.log('nextTick 1');
});

process.nextTick(() => {
    console.log('nextTick 2');
});

setImmediate(() => {
    console.log('setImmediate');
});

console.log('End');

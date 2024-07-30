console.log('Start');

setImmediate(() => {
    console.log('setImmediate 1');
});

setImmediate(() => {
    console.log('setImmediate 2');
});

setTimeout(() => {
    console.log('setTimeout');
}, 0);

console.log('End');

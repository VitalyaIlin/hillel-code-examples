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
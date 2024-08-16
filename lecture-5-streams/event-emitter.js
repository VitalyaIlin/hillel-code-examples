import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('myEvent', (index) => {
    console.log(`myEvent occurred ${index}`);
});

eventEmitter.on('myEvent', () => {
    console.log(`Second handler: myEvent occurred`);
});

eventEmitter.prependListener('myEvent', () => {
    console.log('First');
})


eventEmitter.on('finish', (index) => {
    console.log(`myEvent occurred ${index}`);
});


console.log(eventEmitter.eventNames())


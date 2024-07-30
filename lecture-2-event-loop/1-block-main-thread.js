function blockMainThread() {
    const start = Date.now();
    let now = start;
    while (now - start < 10000) { // Blocking for 10 seconds
        now = Date.now();
    }
    console.log('Finished blocking the main thread for 10 seconds.');
}

blockMainThread();

console.log('This message will be logged after the blocking operation.');

(async function () {
    const module2 = await import('./module2.js');
    console.log(module2);
    module2.sayHello('Vatalii');
})()

console.log(56456);
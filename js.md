What is the Event Loop?
The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that a single JavaScript thread is used by default — by offloading operations to the system kernel whenever possible.

function logA() { console.log('A') }
function logB() { console.log('B') }
function logC() { console.log('C') }
function logD() { console.log('D') }

// Click the "RUN" button to learn how this works!
logA();
setTimeout(logB, 0);
Promise.resolve().then(logC);
logD();

//output =>  is A D C B

https://www.jsv9000.app/

![alt text](image.png)
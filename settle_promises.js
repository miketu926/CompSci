// a promise takes in a function of two paramters, resolve and reject

// let promise1 = new Promise((resolve, reject) => {
//   let a = 1 + 1; // some action performed and returned if good or not
//   if (a === 2) {
//     resolve('Success!');
//   } else {
//     reject('Failed!');
//   }
// });

// promise1.then((message) => {
//   console.log("THIS MESSAGE IS RESOLVED " + message);
// }).catch((message) => {
//   console.log("THIS MESSAGE IS REJECTED " + message);
// });

const promise2 = new Promise(resolve => {
  resolve("P2 RESOLVED");
});
const promise3 = new Promise((resolve, reject) => {
  reject("P3 REJECTED");
});
const promise4 = new Promise(resolve => {
  resolve("P4 RESOLVED");
});

const allPromises = [promise2, promise3, promise4];

Promise.all(allPromises).then(messages => {
  messages.forEach(message => console.log(message));
});

// the above Promise.all(allPromises) is the same as:
allPromises.forEach(promise => {
  promise.then((message) => console.log(message));
});

Promise.race(allPromises).then(message => console.log(message));

const settlePromises = async promises => {

  const result = [];

  return new Promise((resolve, reject) => {

    promises.forEach(promise => {

      try {
        const resolve = await promise();
        result.push(resolve);
      } catch (err) {
        result.push(err);
      } finally {
        if (result.length === promises.length) {
          resolve(result);
        }
      }
    });
  });
  // return a promise with .then as an array of objects that describes the outcome of each promise
};

console.log(settlePromises(allPromises).then(result => console.log(result)));

// Async arrow functions look like this:

// const foo = async () => {
//   // do something
// }

// Async arrow functions look like this for a single argument passed to it:

// const foo = async evt => {
//   // do something with evt
// }

// The anonymous form works as well:

// const foo = async function () {
//   // do something
// }

// An async function declaration looks like this:

// async function foo() {
//   // do something
// }

// Using async function in a callback:

// const foo = event.onCall(async () => {
//   // do something
// })
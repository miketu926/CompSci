// console.log('one');
// setTimeout(function () {
//   console.log('two');
// }, 0);
// Promise.resolve().then(function () {
//   console.log('three');
// })
// console.log('four');

// (function () {
//   // console.log(name);
//   console.log(test);
//   const name = 'collin'
//   var test = "HI"
//   console.log(name);
//   console.log(test);
// })();

// var name = 'collin'


console.time();
for (i = 0; i < 100000; i++) {
  console.log(i);
}
console.timeEnd();
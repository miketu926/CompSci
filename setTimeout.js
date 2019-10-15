const arr = [10, 11, 12, 13];
for (let i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(i, arr[i]);
  }, 1000);
};

// 0 10
// 1 11
// 2 12
// 3 13

// loop declared with var will give the below answer:
// his answer:
// 4 undefined
// 4 undefined
// 4 undefined
// 4 undefined

// like this:

const arr2 = [10, 11, 12, 13];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(i, arr[i]);
  }, 1000);
};
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

// loop declared with var will have the below answer:
// his answer:
// 4 undefined
// 4 undefined
// 4 undefined
// 4 undefined

// updated answer - always reset result in order to capture the updated result for that stack

const arr2 = [1, 2, [3, 4], 5];

const flatten = (arr) => {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(flatten(arr2));
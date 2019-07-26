let arr = [10, 11, 12, 13];
for (let i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(i, arr[i]);
  }, 1000);
}

// 0 10
// 1 11
// 2 12
// 3 13

// his answer:
// 4 undefined
// 4 undefined
// 4 undefined
// 4 undefined


const flatten = (arr) => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      return flatten(arr[i]);
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(flatten(arr));
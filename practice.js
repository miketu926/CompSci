const arr = [[1, 2], [1, [1, 2, 3]], 2];

const flatten = (arr) => {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      let newArr = flatten(item);
      result = result.concat(newArr);
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flatten(arr));


const nums = [1, 2, 3, 4, 5];

console.log(nums.reduce((accum, i) => accum + i))


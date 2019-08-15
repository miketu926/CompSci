// updated answer - always reset result in order to capture the updated result for that stack
const arr2 = [1, 2, [3, [4, 6]], 5];

const flatten = (arr) => {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      let newArr = flatten(arr[i]); // an array (a new result arr)
      result = result.concat(newArr);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

const flattenClosure = (arr) => {
  const result = [];

  const _recurse = (arr) => {
    for (const el of arr) {
      if (Array.isArray(el)) {
        _recurse(el);
      } else {
        result.push(el);
      }
    }
  }
  _recurse(arr);
  return result;
}

console.log(flatten(arr2));
console.log(flattenClosure(arr2));
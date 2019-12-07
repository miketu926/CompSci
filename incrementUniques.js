// given an array, increment any duplicate element until all elements are unique.
// The sum of the elements must be the minimum possible.
// For example, 

// if arr = [3,2,1,2,7]
// second 2 turns into 4
// return sum at the end => 17

const arr = [3, 2, 1, 2, 7];
const arr2 = [1, 1, 1, 1, 1];

const incrementUniques = (arr) => {
  const hashMap = {};
  let sum = 0;

  for (const item of arr) {
    hashMap[item] = (hashMap[item] || 0) + 1;
  }

  for (const k in hashMap) {
    let currVal = parseInt(k);
    if (hashMap[k] === 1) {
      sum += currVal;
      continue;
    }

    sum += currVal;
    let updatedVal = currVal;
    while (!hashMap[updatedVal]) {
      sum++;
      updatedVal++;
    }

  }
  return sum;
};

console.log(incrementUniques(arr)); // 15
// console.log(incrementUniques(arr2));
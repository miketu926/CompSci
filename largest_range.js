// Write a function that takes in an array of integers and returns an array of length 2 represeting
// the largest range of numbers contained in that array. 
// The first number in the output array should be the first number in the range while the second number
// should be the last number in the range.

// a range is: [1,5] = {1,2,3,4,5} where range = 5

// input: [1,11,3,0,15,5,2,4,10,7,12,6]
// output: [0,7]

const largestRange = (arr) => {
  arr.sort((a, b) => a - b)

  // then have one pointer at first idx, then another to see if +1 gives the next
  // number. if not, reset and go
  // [0,1,2,3,4,5,6,7,10,11,12,15]

  let currResult = [arr[0], arr[0]];
  let result = currResult;
  if (arr.length === 1) return result;
  if (arr.length === 2) return [arr[0], arr[1]];

  console.log(arr);
  console.log(currResult);

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - 1 === arr[i - 1] || arr[i] === arr[i - 1]) {
      currResult[1] = arr[i]
    } else {
      currResult = [arr[i], arr[i]]
    }

    console.log(currResult);

    if (result[1] - result[0] + 1 < currResult[1] - currResult[0] + 1) {
      result = currResult;
    }
  }

  return result;
};

console.log(largestRange([0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 15]));
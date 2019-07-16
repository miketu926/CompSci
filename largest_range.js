// Write a function that takes in an array of integers and returns an array of length 2 represeting
// the largest range of numbers contained in that array. 
// The first number in the output array should be the first number in teh range while the second number
// should be the last number in teh range.

// a range is: [1,5] = {1,2,3,4,5} where range = 5

// input: [1,11,3,0,15,5,2,4,10,7,12,6]
// output: [0,7]

const largestRange = (arr) => {
  arr.sort((a, b) => a - b);

  // then have one pointer at first idx, then another to see if +1 gives the next
  // number. if not, reset and start
  // [0,1,2,3,4,5,6,7,10,11,12,15]
  if (arr.length === 1) return [arr[0], arr[0]];

  let range = 1;
  let start = arr[0];
  let end = arr[1];
  let maxRange = end - start + 1;
  let result = [start, start + maxRange - 1];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] + 1 === arr[i + 1] || arr[i] === arr[i + 1]) {
      range++;
      end = arr[i + 1];
      continue;
    } else {
      if (range > maxRange) {
        result[0] = start;
        result[1] = start + end - 1;
        maxRange = range;
      }
      start = arr[i];
      end = arr[i + 1]
      range = 1;
    }
  }

  return result;
};
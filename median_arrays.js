// find median of 2 array inputs [1,3] & [2,4,6] output is 3. 3 is the average median
// of the individual medians (2 & 4);

const medianArrays = (arr1, arr2) => {
  return (med(arr1) + med(arr2)) / 2;
};

const med = (arr) => {
  if (arr.length % 2 !== 0) {
    return arr[Math.floor(arr.length / 2)];
  } else {
    let num1 = arr[Math.floor(arr.length / 2)];
    let num2 = arr[Math.floor(arr.length / 2) - 1];
    return (num1 + num2) / 2;
  }
};

console.log(medianArrays([1, 3, 4, 7], [2, 4, 6]));
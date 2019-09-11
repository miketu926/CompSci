// problem set
// how find works (takes a function)

// flatten
// bubbleSort
// mergeSort
// quickSort
// binarySearch
// secondMin
// no duplicates
// twoSum
// mySort
// medianArray
// minLengthSubArray
// stockPrice1
// stockPrice2
// reverseSentInPlace


a = [1, 2, 3, 4, 5];

let checkage = age => {
  return age > 2;
};

// console.log(a.find(checkage));

const mergeSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  let midIdx = Math.floor(arr.length / 2);
  let left = arr.slice(0, midIdx);
  let right = arr.slice(midIdx);

  let leftSorted = mergeSort(left);
  let rightSorted = mergeSort(right);

  return merge(leftSorted, rightSorted);

};

const merge = (arr1, arr2) => {
  let merged = [];

  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      merged.push(arr1.shift());
    } else {
      merged.push(arr2.shift());
    }
  }

  return [...merged, ...arr1, ...arr2];
};


// mergeSort test:
// console.log(mergeSort([3, 5, 2, 1, 0, 9]));

const quickSort = arr => {
  if (arr.length <= 1) {
    return arr;
  }

  // shift takes out the element of the array
  // so that it can reach the base case
  let pivot = arr.shift();
  let left = arr.filter(el => el < pivot);
  let right = arr.filter(el => el >= pivot);

  let leftSorted = quickSort(left);
  let rightSorted = quickSort(right);

  return [...leftSorted, pivot, ...rightSorted];

};

// console.log(quickSort([3, 5, 2, 1, 0, 9]));

const powerOfTen = (num) => {

  while (num >= 10) {
    num = num / 10;
  }

  if (num === 1) return true;
  return false;

};

// console.log(powerOfTen(1000)); // true
// console.log(powerOfTen(500)); // false

const secondMin = (arr) => {

  let firstMin = Infinity;
  let secondMin = Infinity;

  arr.forEach(el => {
    firstMin = Math.min(firstMin, el);
  });

  arr.forEach(el => {
    if (el > firstMin) {
      secondMin = Math.min(secondMin, el);
    }
  });

  return secondMin;
};

// console.log(secondMin([4, 8, 1, 10, 2])); // 2

//no duplicates using a SET
const noDuplicates = (arr) => {
  // use a SET for unique items and order
  let result = new Set();

  arr.forEach(el => {
    result.add(el);
  });

  // both of the below will return an array from a set

  // return Array.from(result);
  return [...result];
};

// console.log(noDuplicates([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5]));

const mySort = (arr) => {
  // sorting DOES NOT HAVE {} block
  arr.sort((a, b) => a - b);
  return arr;
};

// console.log(mySort([1, 3, 2, -1, -3]));

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

// console.log(medianArrays([1, 3, 4, 7], [2, 4, 6]));


// min length of subarray with sum >= target
// [1,2,3,4] target = 6

const minLengthSubArr = (arr, target) => {
  let minLength = Infinity;
  let sum = 0;
};

// 2) Given same arr of stock prices, find the most profit that can be made
// ex: [5, 6, 4, 2, 8, 7, 1, 2, 9, 2] ans: (6 - 5) + (8 - 2) + (9 - 1) => 8

const stockPrice2 = (prices) => {
  let max = 0;
  let i = 0;

  while (i < prices.length - 1) {
    max += Math.max(0, prices[i + 1] - prices[i]);
    i++;
  }

  return max;
};

// console.log(stockPrice2([5, 6, 4, 2, 8, 7, 1, 2, 9, 2]));

const reverseSentInPlace = (sent) => {
  return sent.split('').reverse().join('');
};

// console.log(reverseSentInPlace("HI HOW ARE YOU!"));


// set mechanics

const testSet = () => {
  let mySet = new Set();

  mySet.add("A");
  mySet.add("B");
  mySet.clear(); // clears all elements within the mySet
  mySet.add("A");
  mySet.add("B");
  mySet.add(2);
  mySet.add(2); // duplicates will not be added
  mySet.delete("A");
  console.log(mySet);
  console.log(mySet.has("A")); // false
  console.log(mySet.values());
  console.log(mySet.entries());
  mySet.forEach(el => console.log(el));
  let arrayFromSet = [...mySet]; // spread operator turns set into an arrayl;
  console.log(arrayFromSet);
};

// testSet();
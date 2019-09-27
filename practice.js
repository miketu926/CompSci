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
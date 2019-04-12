// problem set
// how find works (takes a function)

// flatten
// bubbleSort
// mergeSort
// quickSort
// binarySearch

a = [1, 2, 3, 4, 5];

let checkage = age => {
  return age > 2;
};

// console.log(a.find(checkage));


//flatten(data) => given an array of random subarrays, flatten it so it becomes one single array
// input: ('this is also an example') output: [ 'this is also an example' ]

const flatten = (data) => {
  if (!Array.isArray(data)) return [data];

  let result = [];

  data.forEach(el => {
    let flattened = flatten(el);
    result.push(...flattened);
  });

  return result;
};


// BUBBLESORT
// input: [3,9,4,6,3] -> length 5
// output: [3,3,4,6,9]


const bubbleSort = arr => {
  let finished = false;

  while (!finished) {
    finished = true;

    for (let i = 0; i < arr.length - 1; i++) {
      let j = i + 1;

      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        finished = false;
      }
    }
  }
  return arr;
};

// bubbleSort test:
// console.log(bubbleSort([3, 9, 4, 6, 3]));

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

const binarySearch = (arr, target) => {
  if (arr.length <= 0) {
    return false;
  }

  let midIdx = Math.floor(arr.length / 2);
  let left = arr.slice(0, midIdx);
  let right = arr.slice(midIdx + 1);

  if (target < arr[midIdx]) {
    return binarySearch(left, target);
  } else if (target > arr[midIdx]) {
    return binarySearch(right, target);
  } else {
    return true;
  }
};

console.log(binarySearch([-1, 0, 5, 7, 10, 19], 19)); // true
console.log(binarySearch([-1, 0, 5, 7, 10, 19], 1)); // false
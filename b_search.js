const binarySearch = (arr, target) => {
  let L = 0;
  let R = arr.length - 1;

  while (L <= R) {
    // no overflow of integers if you're adding the difference
    let mid = Math.floor(L + (R - L) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (target > arr[mid]) {
      L = mid + 1;
    } else {
      R = mid - 1;
    }
  }
  return false;
};

console.log(binarySearch([-1, 0, 5, 7, 10, 19], 19)); // 5
console.log(binarySearch([-1, 0, 5, 7, 10, 19], -1)); // 0
console.log(binarySearch([-1, 0, 5, 7, 10, 19], 5)); // 2
console.log(binarySearch([-1, 0, 5, 7, 10, 19], 0)); // 1
console.log(binarySearch([-1, 0, 5, 7, 10, 19], 2)); // false
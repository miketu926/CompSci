const myArray = [2, 4, 1, 6, -7, 8, 5, 9, 3, 4];

const quickSortV1 = arr => {
  if (arr.length <= 1) {
    return arr;
  }

  // shift takes out the element of the array
  // so that it can reach the base case
  let pivot = arr.shift();
  let left = arr.filter(el => el < pivot);
  let right = arr.filter(el => el >= pivot);

  let leftSorted = quickSortV1(left);
  let rightSorted = quickSortV1(right);

  return [...leftSorted, pivot, ...rightSorted];

};
console.log(quickSortV1(myArray));

const quickSortV2 = function (arr) {
  if (arr.length === 0) {
    return arr;
  }

  let left = [];
  let right = [];
  let pivot = arr[0];

  // partition values into upper and lower
  // start at second element, since we are using first element as the pivot
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    }
    else {
      right.push(arr[i]);
    }
  }

  left = quickSortV2(left);
  right = quickSortV2(right);

  return left.concat(pivot, right);
};
console.log(quickSortV2(myArray));
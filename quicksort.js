const QuickSort = function (inputArr) {
  let left = [];
  let right = [];
  let pivot;

  if (inputArr.length === 0) {
    return inputArr;
  }

  pivot = inputArr[0];

  // partition values into upper and lower
  // start at second element, since we are using first element as the pivot
  for (let i = 1; i < inputArr.length; i++) {

    if (inputArr[i] <= pivot) {
      left.push(inputArr[i]);
    }
    else {
      right.push(inputArr[i]);
    }
  }

  left = QuickSort(left);
  right = QuickSort(right);

  return left.concat(pivot, right);
};


const myArray = [2, 4, 1, 6, 8, 5, 9, 3, 4];
console.log(QuickSort(myArray));
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
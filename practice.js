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
        // let temp = arr[i];
        // arr[i] = arr[j];
        // arr[j] = temp;

        // another way to swap using ES6 -
        [arr[i], arr[j]] = [arr[j], arr[i]];
        finished = false;
      }
    }
  }
  return arr;
};

console.log(bubbleSort([3, 9, 4, 6, 3]));

// new commit
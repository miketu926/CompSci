// Find the maximum number of chunks needed to sort an array?

// Suppose I had an array:

// [1, 8, 5, 6, 10, 9, 11, 12];

// I want to sort it by ascending order, but find out the maximum groups I would need to sort.
// In this example, the answer would be:

// [1], [8, 5, 6], [10, 9], [11], [12]: so 5

function solution(A) {
  let stack = [A[0]];
  let last;

  for (let i = 0; i < A.length; i++) {
    if (A[i] >= stack[stack.length - 1]) {
      stack.push(A[i])
    } else {
      last = stack.pop();
      while (stack.length > 0 && A[i] < stack[stack.length - 1]) {
        stack.pop();
      }
      stack.push(last);
    }
  }
  return stack.length;
}


//https://stackoverflow.com/questions/49078648/how-to-find-maximum-number-of-groups-needed-to-sort-an-array
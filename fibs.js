// return an array of n fib numbres with fibonacci starting with 0 and 1.

const fibsArr = (n) => {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  // []
  // [0]
  // [0, 1]
  // [0, 1, 1]
  // prev = [0, 1, 1, 2] // result = prev[n-1].concat(n-2, n-1)
  // [0, 1, 1, 2, 3]

  let prev = fibsArr(n - 1);
  return prev.concat(prev[n - 2] + prev[n - 3]);
}

console.log(fibsArr(10));

const fibs = (n) => {
  if (n <= 1) return 0;
  if (n === 2) return 1;
  let first = 0;
  let second = 1;
  let next;

  // n = 3, first = n-1, second = n-2

  for (let i = 3; i <= n; i++) {
    next = first + second;
    first = second;
    second = next;
  }

  return next;
}

console.log(fibs(10))
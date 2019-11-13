// Take a positive integer, like 9, and apply the following rule:

// if it’s odd multiply it by 3 and add 1
// if it’s even, divide it in half.
// For example, applying this rule to 9 yields 28

// Apply this rule repeatedly and you'll create a chain:

// 9 → 28 → 14 → 7 → 22 → 11 → 34 → 17 → 52 → 26 → 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1.
// This particular chain requires 19 steps before it hits 1.

// The Collatz conjecture says that all such chains will in fact hit 1 eventually. Calling 1 the end of a chain, for what integer less than a million is the Collatz chain the longest?

const calculateSteps = (num, memo) => {
  let steps = 0;

  while (num !== 1) {
    if (memo[num]) return memo[num] + steps;

    if (num % 2 !== 0) {
      num = (num * 3) + 1;
    } else {
      num = num / 2;
    }
    steps++;
  }

  memo[num] = steps;
  return memo[num];
}

const collatz = () => {
  const memo = {}
  let maxSteps = -Infinity
  let steps = -Infinity
  let result = 0

  for (let i = 1; i < 1000000; i++) {
    steps = calculateSteps(i, memo);

    if (steps > maxSteps) {
      maxSteps = steps;
      result = i;
    }
  }

  return result;
}

console.log(collatz());
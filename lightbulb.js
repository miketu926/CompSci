// Given the order of lightbulbs that needs to be turned on, return the count
// of switches that needs to be flipped in order if the power comes from the left side

// for example, lightbulb 1 needs to be on first for lightbulb 2..n to receive power

// [3, 2, 1, 5, 4]
// => 2, flip 1, then flip 4 (3 and 2 turns on when 1 is flipped, then 5 turns when 4 is flipped)

// [1,2,3]
// => 3, flip 1 then 2 then 3

// [3, 2, 1, 4, 5]
// => 3 flip 1, then 4 then 5

const lightBulb = (arr) => {
  const DP = Array(arr.length).fill(0);
  DP[0] = arr[0] === 1 ? 1 : 0;
  let ref = arr[0] === 1 ? 2 : 1;
  let max;

  for (let i = 1; i < DP.length; i++) {
    let max = Math.max(arr[i])
    if (arr[i] === ref) {
      DP[i] = DP[i - 1] + 1;
      ref = max + 1;
    } else {
      DP[i] = DP[i - 1];
    }
  }
  console.log(DP);
  return DP[DP.length - 1];
}

console.log(lightBulb([3, 2, 1, 4, 5]))
console.log(lightBulb([3, 2, 1, 5, 4]))
console.log(lightBulb([1, 2, 3, 4, 5]))
console.log(lightBulb([3, 1, 2, 4, 5]))
// [3, 2, 1, 5, 4]
// [0, 0, 1, 1, 2]

// [1,2,3]
// [1,2,3]

const lightBulb = (arr) => {
  const DP = Array(arr.length).fill(0);
  DP[0] = arr[0] === 1 ? 1 : 0;
  let ref = arr[0] === 1 ? 2 : 1;

  for (let i = 1; i < DP.length; i++) {
    if (arr[i] === ref) {
      DP[i] = DP[i - 1] + 1;
      ref = i + 2;
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

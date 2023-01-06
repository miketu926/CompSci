const arr = [1, 4, 5, 6];

const testArr = Array.from(arr, () => null);

const testArr2 = Array(4).fill(null);

console.log(testArr);
console.log(testArr2);
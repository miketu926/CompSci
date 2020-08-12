const obj = {
  2: 43,
  "US": 19,
  "IN": 395,
  "IR": 32,
  "EG": 12,
  "SA": 17,
};

const array = [];
for (const key in obj) {
  array.push({
    name: key,
    value: obj[key]
  });
}

const sortedArray = array.sort((a, b) => a.value - b.value);
console.log(sortedArray);

const notInOrder = [2, 4, 4, 1, 6, 5, 2, 3];
const inOrder = notInOrder.sort((a, b) => a - b);
console.log(inOrder);

console.log(parseInt(array[1].name));

console.log(~~false + 1) // 1 (this is commonly used when setting initial maps since the key will be undefined)
// for example:
// const freqMap = {};
// for (const num of nums) {
//   freqMap[num] = ~~freqMap[num] + 1;
// };
console.log(~~false) // what is ~~ ?
// ~N = -(N+1)
// ~~(false + 1) = 1
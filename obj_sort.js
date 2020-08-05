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

array.sort((a, b) => b.value - a.value);

console.log(parseInt(array[1].name));

console.log(~~false + 1) // 1
console.log(~~false) // what is ~~ ?
// ~N = -(N+1)
// ~~(false + 1) = 1
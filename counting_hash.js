const str = 'bananas'

const counterV1 = (str) => {
  const counter = {};
  for (const letter of str) {
    counter[letter] ? counter[letter]++ : counter[letter] = 1;
  }
  return counter;
}

const counterV2 = (str) => {
  const counter = {};
  for (const letter of str) {
    counter[letter] = (counter[letter] || 0) + 1;
  }
  return counter;
}


console.log(counterV1(str));
console.log(counterV2(str));
// console.log(counterV3(str));
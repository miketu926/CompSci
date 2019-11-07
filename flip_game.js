// Leetcode: 293:

// for any consecutive "++", flip it into "--", output in an array
// all the variations of possible outcomes

const test = '++++'
// should output ['--++', '+--+', '++--']

const transform = (str, idx) => {
  let newStr = "";

  for (let i = 0; i < str.length; i++) {
    if (i === idx || i === idx + 1) {
      newStr += '-';
    } else {
      newStr += str[i];
    }
  }

  return newStr;
}

const flip = (str) => {
  const result = [];

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] + str[i + 1] === '++') {
      let newStr = transform(str, i);
      result.push(newStr);
    }
  }

  return result;
}

console.log(flip(test));
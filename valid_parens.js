const validParens = (str) => {  // "()()(())"
  counter = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      counter++;
    } else if (str[i] === ')' && counter > 0) {
      counter--;
    } else if (counter <= 0 && str[i] === ')') {
      return false;
    }
  }

  return counter === 0 ? true : false;
};

console.log(validParens("()()(())"));
console.log(validParens("()()(()))"));
console.log(validParens("))(("));
console.log(validParens("((("));
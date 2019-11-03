// both sum and es6
// how to write a function does the following:
// sum(1)(2)(3)(4)() = 10;

function sum(a) {
  return function (b) {
    if (b) {
      return sum(a + b)
    } else {
      return a;
    }
  }
}

console.log(sum(1)(2)(3)(4)());

const es6 = (a) => (b) => {
  if (b) {
    return es6(a + b)
  } else {
    return a;
  }
}

console.log(es6(1)(2)(3)(4)());
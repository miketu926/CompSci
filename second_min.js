const secondMin = (arr) => {

  let firstMin = Infinity;
  let secondMin = Infinity;

  arr.forEach(el => {
    firstMin = Math.min(firstMin, el);
  });

  arr.forEach(el => {
    if (el > firstMin) {
      secondMin = Math.min(secondMin, el);
    }
  });

  return secondMin;
};

console.log(secondMin([4, 8, 1, 10, 2])); // 2
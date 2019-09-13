const powerOfTen = (num) => {

  while (num >= 10) {
    num = num / 10;
  }

  if (num === 1) return true;
  return false;

};

// console.log(powerOfTen(1000)); // true
// console.log(powerOfTen(500)); // false
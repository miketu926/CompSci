const mySort = (arr) => {
  arr.sort((a, b) => a - b);
  return arr;
};

console.log(mySort([1, 3, 2, -1, -3]));
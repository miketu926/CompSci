//no duplicates using a SET
const noDuplicates = (arr) => {
  // use a SET for unique items and order
  let result = new Set();

  arr.forEach(el => {
    result.add(el);
  });

  // both of the below will return an array from a set

  // return Array.from(result);
  return [...result];
};

console.log(noDuplicates([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5]));
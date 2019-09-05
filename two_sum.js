var twoSum = function (nums, target) {

  // can't return out of forEach
  let result = [];

  nums.forEach((el1, idx1) => {
    nums.forEach((el2, idx2) => {
      if (idx2 > idx1 && el1 + el2 === target) {
        result.push(idx1, idx2);
      }
    });
  });

  return result;
};

console.log(twoSum([1, 2, 3], 4));
const houseRobber = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const result = Array(nums.length);
  result[0] = nums[0]
  result[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    result[i] = Math.max(nums[i] + result[i - 2], result[i - 1])
  }

  return result[result.length - 1];
};

const houseRobberConstantSpace = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let temp;
  let left = nums[0]
  let right = Math.max(nums[0], nums[1])

  for (let i = 2; i < nums.length; i++) {
    temp = Math.max(nums[i] + left, right);
    left = right;
    right = temp;
  }

  return right;
};

console.log(houseRobber([1, 2, 3, 1]));
console.log(houseRobberConstantSpace([1, 2, 3, 1]));
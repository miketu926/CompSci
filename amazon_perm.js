// 3.
// input:
// arr1 = ['a', 'b', 'c']
// arr2 = ['1', '2', '3']

// output = all combinations of strings such that the order of placement remains the same within its respective arr1 and arr2s.

// for example => 'abc123', 'a123bc', 'a1b2c3'.
// invalid example => 'a2b1c3' because 2 1 3 is not in order of the original arr
// return all combinations in an array

const allPerms = (arr1, arr2) => {
  const result = [];
  let len = arr1.length;

  const _recurse = (s1, s2, currStr = "") => {
    if (s1 >= len || s2 >= len) {
      return;
    }



  }

  return result;
}
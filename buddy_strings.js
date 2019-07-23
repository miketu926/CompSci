// Given two strings A and B of lowercase letters, 
// return true if and only if we can swap two 
// letters in A so that the result equals B.

// strategy = create a 2D array called diff => length should be only 2 if there are differences.
// if the diff length is 0, then 

const buddyStrings = (A, B) => {
  let [diff, setA] = [[], new Set(A)];

  for (const idx in A) {
    if (A[idx] !== B[idx]) {
      diff.push([A[idx], B[idx]]);
    }
  }

  return diff.length === 2 && diff[0].join("") === diff[1].reverse().join("")
    || diff.length === 0 && setA.size !== A.length;
};


console.log(buddyStrings("abcde", "abdce"));
console.log(buddyStrings("abeee", "abeee"));
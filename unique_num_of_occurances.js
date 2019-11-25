// LC 1207: Unique number of occurances

// Given an array of integers arr, write a function that returns true if and only if the number of 
// occurrences of each value in the array is unique.

// Input: arr = [1,2,2,1,1,3]
// Output: true
// Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. 
// No two values have the same number of occurrences.

const uniqueOccurrences = (arr) => {
  // frequency map freqMap[]
  const freqMap = {};
}

console.log(uniqueOccurrences([1, 2, 2, 1, 1, 3])); // true
console.log(uniqueOccurrences([1, 2])); // false
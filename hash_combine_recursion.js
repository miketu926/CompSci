// - Given an array that contains multiple hashes, 
// create a new hash that combines all of the hash keys and values.
// Each key in the new hash should have all unique values.
// Cannot use any conditional statements such as if, else, ... ? ... : ... .

const arr = [{
  a: "APR",
  b: true
},
{
  a: "APR",
  b: false
}];

// => {
//   a: ("APR"),
//   b: (true, false)
// }

const hashCombination = (arr) => {
  const result = {};

  for (const hash of arr) {
    console.log(hash);
  }

};

console.log(hashCombination(arr));
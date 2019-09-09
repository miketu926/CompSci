// a string of words has been chopped up into pieces and rearranged to form a scrambled string
// find the original string of words.

// you are given a file with 3 lines
// first line is a list of the words used (like a dictionary) delimited by commas
// second line is the scrambled string
// third line is the number of times chopped

// example:

// input.txt
// 'world,hello'
// 'rldhello wo'
// '1'

// output should be 'hello world'

// the input file would be in the local directory, named as input.txt
const fs = require('fs');

// generate permutations of the words provided (one of the perms is the answers!)
// generate possible splits for each of the permutations
// set a hashMap of the split and map it to the permutation
// look up the second line in the hashMap to find the correct permutation


fs.readFile('input.txt', 'utf8', function (err, contents) {
  let lineOne, scrambledString, splits;

  [lineOne, scrambledString, splits] = contents.split("\n");

  const words = lineOne.split(",");
  const wordPermutations = generatePermutations(words);
  // console.log(wordPermutations);
  const hashMap = {};

  for (const string of wordPermutations) {
    let scrambledStrings = flatten(generateSplits(string, splits));

    for (const scrambledString of scrambledStrings) {
      hashMap[scrambledString] = string;
    }
  }

  console.log(hashMap[scrambledString]);
});

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function generatePermutations(words, space = true) {
  const permutations = [];

  function _generatePermutations(words, size) {
    if (size === 1) {
      permutations.push(words.join(space ? " " : ""));
      return;
    }

    for (let i = 0; i < size; i++) {
      _generatePermutations(words, size - 1);

      if (size & 1) {
        [words[0], words[size - 1]] = [words[size - 1], words[0]]
      } else {
        [words[i], words[size - 1]] = [words[size - 1], words[i]]
      }
    }
  }

  _generatePermutations(words, words.length)

  // console.log(permutations);
  return permutations;
}

function generateSplits(string, splits) {
  const scrambledStrings = [];

  function _generateSplits(string, splits, current) {
    if (splits === 0) {
      scrambledStrings.push(generatePermutations(current.concat(string), false));
      return
    }

    for (var i = 1; i < string.length - splits; i++) {
      _generateSplits(string.slice(i), splits - 1, current.concat(string.slice(0, i)));
    }
  }

  _generateSplits(string, splits, []);

  console.log(scrambledStrings);
  return scrambledStrings;
}
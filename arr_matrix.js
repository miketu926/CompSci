const words = ['eat', 'rain', 'in', 'rat'];

// matrix M*N
const matrix = [
  ['e', 'a', 'n'],
  ['t', 't', 'i'],
  ['a', 'r', 'a']
];

// return 3 since the most words found within the matrix from the array is
// eat, in, rat - without the letters overlapping

const dictMatrix = (words, matrix) => {
  let result = 0;

  // fill shortest words first
  const sortedWordsByLen = words.sort((a, b) => a.length - b.length);

  // numOfWords*(M*N)
  // first word is 'in'
  for (const word of sortedWordsByLen) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (word[0] === matrix[i][j] && _dfs(word, i, j, matrix, 0)) {
          // pass word, i, j, matrix, idx => add if word is complete
          result += 1;
        }
      };
    };
  };

  return result;
};

const _dfs = (word, i, j, matrix, count) => {
  console.log("idx " + count + " " + " letter of current word " + word[count]);

  if (word.length === count) return true;
  if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length || matrix[i][j] !== word[count]) return false;

  // turn used letters into null so it doesn't count twice
  // how to track used letters once a full word is found?

  let wordFound = _dfs(word, i + 1, j, matrix, count + 1)
    || _dfs(word, i - 1, j, matrix, count + 1)
    || _dfs(word, i, j + 1, matrix, count + 1)
    || _dfs(word, i, j - 1, matrix, count + 1);

  return wordFound;
};


console.log(dictMatrix(words, matrix));
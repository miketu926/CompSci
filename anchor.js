const paragraph = "If you want to jumpstart the process of talking to us about this role, here’s a little challenge: write a program that outputs the largest unique set of characters that can be removed from this paragraph without letting its length drop below 50."

// assuming uppercase and lowercase letters are unique
const findUniques = (para) => {
  // create letter frequency map
  const freqMap = {};
  for (const letter of para) {
    freqMap[letter] = (freqMap[letter] || 0) + 1;
  }

  // sort tuples in desc frequency
  const tuples = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);

  // create resulting array of only letters
  const result = tuples.map(tuple => tuple[0]);

  // since the resulting array is in descending freq order
  // we can remove each letter until a count of 50 is reached
  // leaving us with the rest of the letters that has a combined length of >50.
  let currLength = 0;
  for (const tuple of tuples) {
    let freq = tuple[1];
    currLength += freq;

    if (currLength < 50) { result.shift() }
    else { break }
  }

  return result;
}

console.log(findUniques(paragraph))
console.log(findUniques("Hi"))
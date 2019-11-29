const paragraph = "If you want to jumpstart the process of talking to us about this role, here’s a little challenge: write a program that outputs the largest unique set of characters that can be removed from this paragraph without letting its length drop below 50."

// assuming uppercase and lowercase are unique
const findUniques = (para) => {
  // create letter frequency map
  const freqMap = {};
  for (const letter of para) {
    freqMap[letter] = (freqMap[letter] || 0) + 1;
  }

  // sort tuples in desc frequency
  const tuples = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);

  // resulting array of only letters
  const result = tuples.map(tuple => tuple[0]);

  // remove from the resulting array letters that does not meet the length of 50
  // letters are removed if 
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
// console.log(findUniques("HI"))
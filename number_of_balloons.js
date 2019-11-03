// Given a string text, you want to use the characters of 
// text to form as many instances of the word "balloon" as possible.

// You can use each character in text at most once.
// Return the maximum number of instances that can be formed.

// input: text = "loonbalxballpoon"
// output: 2 (b/c you can create 2 'balloon's with the text)

const maxNumberOfBalloons = (text) => {
  let result = 0;
  const map = { 'b': 0, 'a': 0, 'l': 0, 'o': 0, 'n': 0 };

  for (let letter of text) {
    if (!isNaN(map[letter])) map[letter]++;
  }

  // { b: 2, a: 2, l: 4, o: 4, n: 2 }

  while (map['b'] > 0 && map['a'] > 0 && map['l'] > 1 && map['o'] > 1 && map['n'] > 0) {
    result++;
    map['b']--;
    map['a']--;
    map['l'] -= 2;
    map['o'] -= 2;
    map['n']--;
  }


  return result;
};


console.log(maxNumberOfBalloons("loonbalxballpoon"));
// leetcode 290

var wordPattern = function (pattern, str) {
  const split = str.split(" ");
  if (pattern.length !== split.length) return false;

  const hashMap = {};

  for (let i = 0; i < pattern.length; i++) {
    if (!hashMap[pattern[i]]) {
      if (Object.values(hashMap).indexOf(split[i]) !== -1) return false;
      hashMap[pattern[i]] = split[i];
    } else if (hashMap[pattern[i]] && hashMap[pattern[i]] !== split[i]) {
      return false;
    }
  }

  return true;
};

const pattern = "abba";
const string = "dog cat cat dog";

const pattern2 = "abba";
const string2 = "dog dog dog dog";



console.log(wordPattern(pattern, string)); // true;
console.log(wordPattern(pattern2, string2)); // false;
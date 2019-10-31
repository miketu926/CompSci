const checkPalindrome = (str) => {
  let L = 0;
  let R = str.length - 1;

  while (L <= R) {
    if (str[L] !== str[R]) return false;
    L++;
    R--;
  }

  return true;
}

// console.log(checkPalindrome("bbbc"));


// LC 125: consider only alphanumeric 
const isPalindrome = (s) => {
  let modifiedString = ""

  for (const letter of s) {
    if (letter === " ") continue;
    if (myIncludes(letter.toLowerCase())) modifiedString += letter.toLowerCase();
    console.log(modifiedString);
  }

  let L = 0;
  let R = modifiedString.length - 1;

  while (L <= R) {
    if (modifiedString[L] !== modifiedString[R]) return false;
    L++;
    R--;
  }

  return true;
};

const myIncludes = (letter) => {
  const alpha = 'abcdefghijklmnopqrstuvwxyz0123456789'
  if (alpha.includes(letter)) return true;
  return false;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")) // true
console.log(isPalindrome("race a car")) // false
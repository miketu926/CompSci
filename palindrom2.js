// Leetcode 680:
// Given a non-empty string s, 
// you may delete at most one chracter. Judge whether
// you can make a palindrome

// input: aba  => true
// input: abca => true
// input: abcdef => false

const check = (str, L, R) => {

  while (L <= R) {
    if (str[L] !== str[R]) {
      return false;
    }
    L++;
    R--;
  }

  return true;
}

const palindrome2 = (str) => {
  let L = 0;
  let R = str.length - 1;

  while (L <= R) {
    if (str[L] !== str[R]) {
      return check(str, L + 1, R) || check(str, L, R - 1);
    }

    L++;
    R--;
  }

  return true;
}

console.log(palindrome2('abc')); // false
console.log(palindrome2('aba')); // true
console.log(palindrome2('abca')); // true
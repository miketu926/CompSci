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

console.log(checkPalindrome("bbbc"));
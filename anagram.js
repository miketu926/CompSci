const isAna = (s1, s2) => {
  // O(n) time
  const hash = {};

  // create freq hash
  for (let i = 0; i < s1.length; i++) {
    hash[s1[i]] === undefined ? hash[s1[i]] = 1 : hash[s1[i]] += 1;
  }

  // decrement freq hash with s2, return if no letter is found from s2
  for (let i = 0; i < s2.length; i++) {
    if (hash[s2[i]] === undefined) return false;
    else hash[s2[i]]--;
  }

  // check freq hash to make sure all count 0
  for (const key in hash) {
    if (hash[key] !== 0) return false;
  }

  // return true
  return true;

  // or n*Log(n) time
  // return s1.split("").sort().join("") === s2.split("").sort().join("");

};

console.log(isAna('abc', 'cba'));
const stringCompress = (str) => {

  // 'aaabbc' -> 'a3b2c1'

  let obj = {};
  let result = "";

  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      obj[str[i]] += 1;
    } else {
      obj[str[i]] = 1;
    }
  }

  for (const key in obj) {
    result += key
    result += obj[key];
  }

  return result;
};
// console.log(stringCompress('abbbc'));

const repeatingStr = (str) => {
  let obj = {};
  let result = '';

  // for (let i = 0; i < str.length; i++) {
  //   if (!obj[str[i]]) {
  //     obj[str[i]] = 1;
  //   } else {
  //     obj[str[i]] += 1;
  //   }
  // }

  for (let i = 0; i < str.length; i++) {
    obj[str[i]] === undefined ? obj[str[i]] = 1 : obj[str[i]] += 1;
  };

  for (let char in obj) {
    result += char + obj[char];
  }

  return result;
};

console.log(repeatingStr('aaaabbAAcc'));

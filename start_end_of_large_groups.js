// find the starting index and the ending index of every large group
// a large group is 3 or more consecutive letters

const largeGroups = (str) => {
  const result = [];
  let curr = [0, 0];

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      curr[1] = i + 1;
    } else {
      result.push(curr);
      curr = [];
      curr[0] = i + 1;
      curr[1] = i + 1;
    }

    if (i + 1 === str.length - 1) {
      result.push(curr);
    }
  }

  return result.filter(arr => arr[1] - arr[0] + 1 >= 3);
}

console.log(largeGroups("xxyyyzxxx"));
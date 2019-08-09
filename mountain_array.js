const mountainArr = (arr) => {
  let i = 0;

  while (i < arr.length - 1) {
    if (arr[i] <= arr[i + 1]) {
      i++;
    } else {
      break;
    }
  }

  while (i < arr.length - 1) {
    if (arr[i] >= arr[i + 1]) {
      i++;
    } else {
      break;
    }
  }

  if (arr.length - 1 === i) {
    return true;
  } else {
    return false;
  }

}

console.log(mountainArr([1, 2, 3, 3, 2, 1]))
console.log(mountainArr([1, 2, 3, 4, 5, 6]))
console.log(mountainArr([6, 5, 4, 3, 2, 1]))
console.log(mountainArr([1, 2, 1, 2, 1, 2]))
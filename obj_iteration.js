const test = () => {

  const obj = { a: 1, b: 2, c: 3 };
  const array = [3, 6, 9]

  // IN for array and obj mean the KEY or INDEX at which a value is stored array[0] or key of hash.

  for (const key in obj) {
    console.log(key);
  }

  for (const key in array) {
    console.log(key);
  }

  // of directly accesses an array

  for (const key of array) {
    console.log(key);
  }


};

test();
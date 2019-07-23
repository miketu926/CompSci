const test = () => {

  const obj = { a: 1, b: 2, c: 3 };
  const str = 'abc'
  const array = [3, 6, 9]

  // IN for array and obj mean the KEY or INDEX at which a value is stored array[0] or key of hash.

  for (const key in obj) {
    console.log("const key in obj " + key);
  }

  for (const key in array) {
    console.log("const key in array " + key);
  }

  for (const key in str) {
    console.log("const key in str " + key);
  }

  for (const key of str) {
    console.log("const key of str " + key);
  }

  // of directly accesses an array

  for (const key of array) {
    console.log("const key of array " + key);
  }


};

test();
const outputReport = (obj) => {
  let result = {};

  function _recurse(obj, prev = "") {
    for (const key in obj) {
      if (obj[key].toString() === obj[key]) {
        result[prev + key] = obj[key];
      } else {
        prev += key + "_";
        _recurse(obj[key], prev);
      }
    }
  }

  _recurse(obj);
  return result;
};

const obj = {
  "a": "1",
  "b": {
    "c": "2",
    "d": "3",
    "e": {
      "f": "4"
    }
  }
};

// output should be -
// {
//   "a": "1",
//   "b_c": "2",
//   "b_d": "3",
//   "b_e_f": "4",
// }

// console.log(outputReport(obj));
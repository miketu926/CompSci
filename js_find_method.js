a = [1, 2, 3, 4, 5];

// find is for arrays

let checkage = age => {
  return age > 2;
};

// find takes a call back and returns the number of elements that return true
console.log(a.find((age) => age > 2));
console.log(a.find(checkage));
const arr = [1, 2, 3];
const str = 'abc'
const arrStrs = ['hello', 'world']

let setFromArr = new Set(arr);
let setFromStr = new Set(str);
let setFromArrStrs = new Set(arrStrs);

console.log(setFromArr);
console.log(setFromStr);
console.log(setFromArrStrs);

// set mechanics

const testSet = () => {
  let mySet = new Set();

  mySet.add("A");
  mySet.add("B");
  mySet.clear(); // clears all elements within the mySet
  mySet.add("A");
  mySet.add("B");
  mySet.add(2);
  mySet.add(2); // duplicates will not be added
  mySet.delete("A");

  console.log("start of mechanics")

  console.log(mySet);
  console.log(mySet.has("A")); // false
  console.log(mySet.values());
  console.log(mySet.entries());
  mySet.forEach(el => console.log(el));
  let arrayFromSet = [...mySet]; // spread operator turns set into an arrayl;
  console.log(arrayFromSet);
};

testSet();
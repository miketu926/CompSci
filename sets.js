const arr = [1, 2, 3];
const str = 'abc'
const arrStrs = ['hello', 'world']

let setFromArr = new Set(arr);
let setFromStr = new Set(str);
let setFromArrStrs = new Set(arrStrs);

console.log(setFromArr);
console.log(setFromStr);
console.log(setFromArrStrs);
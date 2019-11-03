// given two arrays/lists of strings, find what the two has in common and provide
// the result that has the least amount of index sums

const arr1 = ["Shogun", "Tapioca Express", "Burger King", "KFC"]
const arr2 = ["KFC", "Shogun", "Burger King"]

// ["Shogun"] b/c index 0 + 1 beats "KFC" with index 3 + 0;

const minIndexSum = (list1, list2) => {
  const set = new Set(list2);
  const result = [];
  let min = Infinity;
  let idx = [];

  list1.forEach((item, i) => {
    if (set.has(item)) {
      let item2Idx = list2.indexOf(item);
      if (min >= item2Idx + i) {
        min = item2Idx + i;
        idx.push(i)
      }
    }
  })

  idx.forEach(i => {
    result.push(list1[i]);
  })

  return result;
}

console.log(minIndexSum(arr1, arr2));
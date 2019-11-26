class HashTable {
  constructor(size = 56) {
    this.keyMap = new Array(size);
  }

  // ways of handling collision: separate chaining & linear probing
  // separate chaining is adding into the array within that address
  // linear probing is adding to the address after if a collision occurs

  hashFunc(key) {
    let total = 0;
    let WEIRD_PRIME = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    //random number % size array will give you position
    return total;
  }

  set(key, value) {
    const position = this.hashFunc(key);
    let match = false;

    if (!this.keyMap[position]) {
      this.keyMap[position] = [[key, value]];
    } else {
      for (let pair of this.keyMap[position]) {
        if (pair[0] === key) {
          pair[1] = value;
          match = true;
        }
      }
      if (!match) {
        this.keyMap[position].push([key, value]);
      }
    }
  }

  get(key) {
    const position = this.hashFunc(key);
    for (let i = 0; i < this.keyMap[position].length; i++) {
      if (this.keyMap[position][i][0] === key) {
        return this.keyMap[position][i][1];
      }
    }
    return "Not Found"
  }
}

// console.log("n".charCodeAt(0))

// function test(key) {
//   let total = 0;
//   let WEIRD_PRIME = 31;

//   for (let i = 0; i < Math.min(key.length, 100); i++) {
//     let char = key[i]; //"n"
//     let value = char.charCodeAt(0) - 96;
//     total = (total * WEIRD_PRIME + value) % 10;
//   }
//   return total;
// }

// console.log(test("name"));

let hash = new HashTable(1);
hash.set("name", "mike");
hash.set("name", "mike2");
hash.set("class", "JS");
console.log(hash.get("name"));
console.log(hash.get("class"));
console.log(hash);
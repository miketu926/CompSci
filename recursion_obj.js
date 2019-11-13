const input = `
    {
      "name": "Charizard",
      "moveset": {
        "slot1": {
          "name": "Fire Spin",
          "pp": 10
        },
        "slot2": null
      },
      "isLegendary": false
    }
  `;

// make an array of tuples in this format
// output:
// [
//   [name, charizard],
//   [moveset.slot1.name, fire spin],
//   [moveset.slot1.pp, 10],
//   [moveset.slot2, null],
//   [isLegendary: false]
// ]

function makePairs(json) {
  const entries = Object.entries(JSON.parse(json));
  let result = [];
  let additional = [];

  const _recurse = (obj, builtString) => {
    let entries = Object.entries(obj);

    for (let item of entries) {
      if (typeof item[1] === 'object' && item[1] !== null) {
        _recurse(item[1], `${builtString}.${item[0]}`)
      } else {
        additional.push([`${builtString}.${item[0]}`, item[1]]);
      }
    }
  };

  for (let pair of entries) {
    if (typeof pair[1] !== 'object') {
      result.push(pair);
    } else {
      // recurse function handles a new object as first param, 2nd param handles key
      _recurse(pair[1], pair[0])
      result = result.concat(additional);
      additional = [];
    }
  }

  return result;
}

console.log(`\n------answer------\n`, makePairs(input), `\n------answer------`)
// makePairs(input);
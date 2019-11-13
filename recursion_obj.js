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

// output:
// [
//   [name, charizard],
//   [moveset.slot1.name, fire spin],
//   [moveset.slot1.pp, 10],
//   [moveset.slot2, null],
//   [isLegendary: false]
// ]

// [['name', 'Charizard'],
//   ['moveset', { slot1: [Object], slot2: null }],
//   ['isLegendary', false]]

function makePairs(json) {
  const entries = Object.entries(JSON.parse(json));
  const result = [];

  const _recurse = (obj, builtString) => {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && typeof obj[key] !== null) {
        return _recurse(obj[key], `${builtString}.${key}`)
      } else {
        return [`${builtString}.${key}`, obj[key]]
      }
    }
  };

  for (let pair of entries) {
    if (typeof pair[1] !== 'object') {
      result.push(pair);
    } else {
      // recurse function handles a new object as first param, 2nd param handles key
      let newPair = _recurse(pair[1], pair[0]);
      result.push(newPair);
    }
  }

  return result;
}

console.log(makePairs(input))
// makePairs(input);
function subSets(arr) {
    if (arr.length === 0) return [[]];
    const firstEl = arr[0];
    const restSubs = subSets(arr.slice(1));
    const withFirstEl = restSubs.map(sub => [ firstEl, ...sub ]);

    return [
        ...withFirstEl,
        ...restSubs
    ];
}

console.log(subSets(['a', 'b', 'c'])); // =>
// [
//     ['a', 'b', 'c'],
//     ['b', 'c'],
//     ['a', 'c'],
//     ['a', 'c'],
//     ['a'],
//     ['b'],
//     ['c'],
//     []
// ]

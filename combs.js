// function subSets(arr) {
//     if (arr.length === 0) return [[]];
//     const firstEl = arr[0];
//     const restSubs = subSets(arr.slice(1));
//     const withFirstEl = restSubs.map(sub => [ firstEl, ...sub ]);

//     return [
//         ...withFirstEl,
//         ...restSubs
//     ];
// }

// function combs(arr, n) {
//     const subs = subSets(arr)
//     return subs.filter(sub => sub.length === n);
// }

function combs(arr, n) {
    if (n === 0) {
        return [ [] ];
    }

    if (n >= arr.length) {
        return [ arr ];
    }

    const firstEl = arr[0];
    const withoutEl = combs(arr.slice(1), n); // get all combs that dont have the first el
    const withEl = combs(arr.slice(1), n - 1).map(comb => { // get all combs that don't have the first element, and then add the first element
        return [ firstEl, ...comb];
    });

    return [
        ...withoutEl,
        ...withEl
    ];
}

console.log(combs(['a', 'b', 'c', 'd', 'e'], 3));

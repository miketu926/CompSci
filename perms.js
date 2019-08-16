function perms(arr) {
    if (arr.length === 0) return [[]];
    const firstEl = arr[0];

    const otherPerms = perms(arr.slice(1));
    const finalPerms = [];

    otherPerms.forEach(perm => {
        for (let i = 0; i <= perm.length; i++) {
            const finalPerm = [...perm.slice(0, i), firstEl, ...perm.slice(i)];
            finalPerms.push(finalPerm);
        }
    });

    return finalPerms;
}

console.log(perms(['a', 'b', 'c'])); // =>
// [
//   [ 'a', 'b', 'c' ],
//   [ 'b', 'a', 'c' ],
//   [ 'b', 'c', 'a' ],
//   [ 'a', 'c', 'b' ],
//   [ 'c', 'a', 'b' ],
//   [ 'c', 'b', 'a' ]
// ]
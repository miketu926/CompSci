function sortByPriceAscending(jsonString) {
  let arr = JSON.parse(jsonString);

  // const result = arr.sort((a, b) => {
  //   if (a.price === b.price) {
  //     return a.name.localeCompare(b.name);
  //   } else {
  //     return a.price - b.price;
  //   }
  // });

  const result = arr.sort((a, b) => {
    return a.price - b.price || a.name.localeCompare(b.name);
  });

  return result;


  // [{ name: 'eggs', price: 1 },
  // { name: 'coffee', price: 9.99 },
  // { name: 'rice', price: 4.04 } ]

}

console.log(sortByPriceAscending('[{"name":"czgs","price":1},{"name":"cgffee","price":1},{"name":"aice","price":1}]'));


// function wrap(execute) {
//   let counter = 0;

//   if (counter > 0) return null;

//   return () => {
//     try {
//       return execute();
//     } catch {
//       counter++;
//       return null;
//     }
//   }
// }

// var errorExec = wrap(function () {
//   throw new Error('Error');
// });
// var resultExec = wrap(function () {
//   return "Result";
// });


// console.log(errorExec && errorExec()); // Should output null
// console.log(errorExec && resultExec()); // Should output "Result"


// // after the function execute has thrown an error, its future executions should
// // be prevented and null should be returned;

// // multipled wrapped functions can coexist;
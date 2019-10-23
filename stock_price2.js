// 1) Given arr of stock prices, find the max profit with as many possible buys/sells as possible
// ex: [5, 6, 4, 2, 8, 7, 1, 2, 9, 2]: ans is 15

// go through the array once, and at each time calculate the difference between the
// current and previous. If it' greater than 0, than add that amount to profit.
// return the profit at the end
// another way of looking at it: calculate the positive diff of every pair which will equal the profit

const stockPrice2 = (prices) => {
  let profit = 0;

  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] - prices[i] > 0) profit += prices[i + 1] - prices[i]
  }

  return profit;
}

console.log(stockPrice2([5, 6, 4, 2, 8, 7, 1, 2, 9, 2]));  // should output 15 as total profit



// 2) Given same arr of stock prices, find the most profit that can be made
// ex: [5, 6, 4, 2, 8, 7, 1, 2, 9, 2] ans: (6 - 5) + (8 - 2) + (9 - 1) => 8

const stockPrice2 = (prices) => {
  let max = 0;
  let i = 0;

  while (i < prices.length - 1) {
    max += Math.max(0, prices[i + 1] - prices[i]);
    i++;
  }

  return max;
};

// console.log(stockPrice2([5, 6, 4, 2, 8, 7, 1, 2, 9, 2]));

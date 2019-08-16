// 1) Given arr of stock prices, find the max profit with as many possible buys/sells as possible
// ex: [5, 6, 4, 2, 8, 7, 1, 2, 9, 2]: ans is 15

const stockPrice2 = (prices) => {
  let profit = 0;

  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] - prices[i] > 0) profit += prices[i + 1] - prices[i]
  }

  return profit;
}

console.log(stockPrice2([5, 6, 4, 2, 8, 7, 1, 2, 9, 2]));  // should output 15 as total profit
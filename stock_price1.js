// 1) Given arr of stock prices, find the one biggest jump that nets you the most profit
// ex: [5, 6, 4, 2, 8, 7, 1, 2, 9, 2]: ans is 8(9 - 1)

const stockPrice1 = (prices) => {
  let min = prices[0];
  let max = -Infinity;

  for (let price of prices) {
    min = Math.min(min, price);
    max = Math.max(max, price - min);
  }


  return Math.max(0, max);
};

console.log(stockPrice1([5, 6, 4, 2, 8, 7, 1, 2, 9, 2]));
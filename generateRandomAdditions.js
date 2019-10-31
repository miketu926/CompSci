// generate number of problems (n) that produces 'x + y' <= a given maxNumber

const generateProblems = (n, maxNumber) => {
  const result = [];

  for (let i = 0; i < n; i++) {
    let first = generateRandomNum(maxNumber);
    let second = generateRandomNum(maxNumber - first);

    result.push(`${first} + ${second} =`)

    // first = 5
    // second has to be between 0 ~ 5 (10 - 5) or maxNumber - first
  }

  return result;
}

const generateRandomNum = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber)
}

console.log(generateProblems(5, 10));
// given an array of objects with student's scores.

// output the average of a given student's highest 5 scores.

const scores = [
  { id: 1, score: 60 },
  { id: 1, score: 90 },
  { id: 1, score: 60 },
  { id: 1, score: 10 },
  { id: 1, score: 20 },
  { id: 1, score: 10 },
  { id: 2, score: 90 },
  { id: 2, score: 10 },
  { id: 2, score: 60 },
  { id: 2, score: 10 },
  { id: 2, score: 60 },
  { id: 2, score: 90 },
  { id: 2, score: 100 },
]

const findAverage = (scores) => {
  const allScores = {};
  let result = [];

  for (let item of scores) {
    if (allScores[item.id]) {
      allScores[item.id].push(item.score);
      allScores[item.id].sort((a, b) => b - a);
    } else {
      allScores[item.id] = [item.score]
    }
  }

  console.log(allScores)

  for (let id in allScores) {
    result.push(allScores[id].slice(0, 5).reduce((total, item) => total + item))
  }

  result = result.map(total => total / 5);

  // for (let id in allScores) {
  //   let sum = 0;
  //   for (let i = 0; i < 5; i++) {
  //     sum += allScores[id][i]
  //   }

  //   result.push((sum / 5));
  //   sum = 0;
  // }

  return result;
}

console.log(findAverage(scores))
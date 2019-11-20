const board =
  [
    ["X", "X", "O"],
    ["X", "O", "X"],
    ["_", "Y", "O"]
  ];

// assuming the board only takes "X", "O", and "_";

function ticTacToeWinner(board) {
  let result = "_";

  // check each row
  for (const row of board) {
    if (checkMarks(row)) {
      result = checkMarks(row);
    }
  }

  // check each col
  for (let i = 0; i < board[0].length; i++) {
    let col = [];
    for (const row of board) {
      col.push(row[i]);
    }

    if (checkMarks(col)) {
      result = checkMarks(col);
    }
  }

  // check both diagonals
  let i = 0;
  let y = 2;
  let leftDiag = []
  let rightDiag = [];
  while (i < 3) {
    leftDiag.push(board[i][y]);
    rightDiag.push(board[y][i]);
    i++;
    y--;
    if (leftDiag.length === 3 && checkMarks(leftDiag)) {
      result = checkMarks(state);
    }
    if (rightDiag.length === 3 && checkMarks(rightDiag)) {
      result = checkMarks(rightDiag);
    }
  };

  return result;
}

const checkMarks = (state) => {
  let result = false;
  if (state[0] === state[1] && state[1] === state[2]) {
    result = state[0];
  }
  return result;
}

console.log(ticTacToeWinner(board));
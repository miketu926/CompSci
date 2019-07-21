const valid_sudoku = (board) => {

  const boxes = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  const cols = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  const rows = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const digit = board[i][j];

      if (digit !== '.') {
        const k = Math.floor(j / 3) + (Math.floor(i / 3) * 3);

        if (boxes[k][digit] || cols[j][digit] || rows[i][digit]) {
          return false;
        }

        boxes[k][digit] = cols[j][digit] = rows[i][digit] = true;
      }
    }
  }

  return true;
};

const m = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]];

const invalid = [
  [".", ".", ".", ".", ".", ".", "5", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  ["9", "3", ".", ".", "2", ".", "4", ".", "."],
  [".", ".", "7", ".", ".", ".", "3", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "3", "4", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", "3", ".", ".", "."],
  [".", ".", ".", ".", ".", "5", "2", ".", "."]];

console.log(valid_sudoku(m));
console.log(valid_sudoku(invalid));
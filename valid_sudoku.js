var isValidSudoku = function (board) {
  if (board.length !== 9 || board[0].length !== 9 || !board) return false;
  let arr = []

  // check rows
  for (let i = 0; i < board.length; i++) {
    if (check_no_repeats(board[i]) === false) return false;
  }

  // check cols
  for (let i = 0; i < board[0].length; i++) {
    arr = []
    for (let j = 0; j < board.length; j++) {
      arr.push(board[j][i])
    }
    if (check_no_repeats(arr) === false) return false;
  }

  // check squares
  arr = []
  for (let i = 1; i <= board.length; i++) {
    for (let j = 1; j <= 3; j++) {
      arr.push(board[i - 1][j - 1])
      console.log(arr);
    }
    if (i % 3 === 0) {
      if (check_no_repeats(arr) === false) return false;
      arr = []
    }
  }

  arr = []
  for (let i = 1; i <= board.length; i++) {
    for (let j = 4; j <= 6; j++) {
      arr.push(board[i - 1][j - 1])
      console.log(arr);
    }
    if (i % 3 === 0) {
      if (check_no_repeats(arr) === false) return false;
      arr = []
    }
  }

  arr = []
  for (let i = 1; i <= board.length; i++) {
    for (let j = 7; j <= 9; j++) {
      arr.push(board[i - 1][j - 1])
      console.log(arr);
    }
    if (i % 3 === 0) {
      if (check_no_repeats(arr) === false) return false;
      arr = []
    }
  }


  return true;
};


const check_no_repeats = (arr) => {
  const nums = arr.filter(el => el !== ".");
  let hash = {}

  for (let i = 0; i < nums.length; i++) {
    if (hash[nums[i]] === undefined) {
      hash[nums[i]] = true;
    }
    else return false;
  }

  return true;
}

const m = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."],
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

// console.log(isValidSudoku(m));
console.log(isValidSudoku(invalid));
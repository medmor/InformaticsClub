const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let isPlayerTurn = Math.random() < 0.5 ? true : false;
if(!isPlayerTurn)
computerPlay();
function cellClick(e) {
  if (isPlayerTurn) {
    const firstChild = e.firstChild;
    if (!firstChild.innerText) {
      const row = e.parentNode.dataset.index;
      const cell = e.dataset.index;
      firstChild.innerText = 'o';
      board[row][cell] = 'o';
      console.log(isWining('o'));
      isPlayerTurn = false;
      setTimeout(() => {
        computerPlay();
      }, 1000);
    }
  }
}

function computerPlay() {
  const table = document.getElementById('container');
  const rows = table.rows;
  for (const row of rows) {
    const cells = row.cells;
    for (const cell of cells) {
      const firstChild = cell.firstChild;
      if (!firstChild.innerText) {
        firstChild.innerText = 'x';
        board[row.dataset.index][cell.dataset.index] = 'x';
        isPlayerTurn = true;
        return;
      }
    }
  }
}

function isWining(c) {
  if (
    (board[0][0] == c && board[0][1] === c && board[0][2] === c) ||
    (board[1][0] == c && board[1][1] === c && board[1][2] === c) ||
    (board[2][0] == c && board[2][1] === c && board[2][2] === c) ||
    (board[0][0] == c && board[1][0] === c && board[2][0] === c) ||
    (board[0][1] == c && board[1][1] === c && board[2][1] === c) ||
    (board[0][2] == c && board[1][2] === c && board[2][2] === c) ||
    (board[0][0] == c && board[1][1] === c && board[2][2] === c) ||
    (board[2][0] == c && board[1][1] === c && board[0][2] === c)
  ) {
    return true;
  }
  return false;
}

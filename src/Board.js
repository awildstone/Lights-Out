import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    /** create array-of-arrays of true/false values */
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        /** found help on how to generate a random boolean based on a percentage here: https://stackoverflow.com/questions/36756331/js-generate-random-boolean */
        let val = (Math.random() < chanceLightStartsOn);
        row.push(val);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    /** check the board in state to determine whether the player has won. */
    return board.every(row => row.every(val => val === false));
  }

  function flipCellsAround(coord) {
    
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      /** Make a (deep) copy of the oldBoard */
      let boardCopy = oldBoard.map(row => [...row]);

      /** in the copy, flip this cell and the cells around it */
      flipCell(y, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y ,x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);

      return boardCopy
    });
  }

  /** if the game is won, just show a winning msg & render nothing else */
  if (hasWon()) return <h1>YOU WIN!</h1>;

  return (
  /** make table board: rows of Cell components */
    <table className="Board">
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => (
              <Cell key={`${y}-${x}`} flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} isLit={cell} />
              )
            )}
          </tr>
          )) 
        }
      </tbody>
    </table>
  )
}

function chance() {
  return Math.random();
}

Board.defaultProps = {
  nrows: 3,
  ncols: 3,
  chanceLightStartsOn: chance()
};

export default Board;

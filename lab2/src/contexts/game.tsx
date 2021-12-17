import React, { createContext, useState, useContext } from "react";
import { ROWS, COLS, P1, P2 } from "../constants";
import { genEmptyBoard } from "../utils/generators";
import { changeFavicon } from "../utils/favicon";

interface Selection {
  turn: typeof P1 | typeof P2;
  row: number;
  col: number;
}

interface ContextType {
  board: number[][];
  turn: number;
  pickSlot: (row: number, col: number) => void;
  selections: Selection[];
  winner: number;
  isOver: () => boolean;
  reset: () => void;
}

/**
 *
 * @param board Current state of the board
 * @param r Row of the selected slot
 * @param c Column of the selected slot
 * @param turn The current player
 * @returns Whether the move will result in a connect four
 */
function isWinningMove(
  board: number[][],
  r: number,
  c: number,
  turn: number
): boolean {
  // make the move, set the selected slot to the player's value
  board[r][c] = turn;

  // determine how many slots to the right of the selected slot are also selected by the player
  let right = c;
  while (right <= COLS - 1 && board[r][right] === turn) {
    right++;
  }

  // determine how many slots to the left of the selected slot are also selected by the player
  let left = c;
  while (left >= 0 && board[r][left] === turn) {
    left--;
  }

  // check if the selected move results in a horizontal connect-four
  if (right - left - 1 === 4) {
    return true;
  }

  // determine how many slots above the selected slot are also selected by the player
  let up = r;
  while (up <= ROWS - 1 && board[up][c] === turn) {
    up++;
  }

  // determine how many slots below the selected slot are also selected by the player
  let down = r;
  while (down >= 0 && board[down][c] === turn) {
    down--;
  }

  // check if the selected move results in a veritcal connect-four
  if (up - down - 1 === 4) {
    return true;
  }

  // check diagonals
  let diagonals = [
    // four directions to check
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
  ].map((increment) => {
    let h = c;
    let v = r;

    // for each diagonal direction, determine how many consecutive slots are selected by the player
    while (
      h >= 0 &&
      h <= COLS - 1 &&
      v >= 0 &&
      v <= ROWS - 1 &&
      board[v][h] === turn
    ) {
      h += increment[0];
      v += increment[1];
    }

    return Math.abs(h - c) - 1; // calculate the distance from the move, this is the number of consecutive slots selected by the player
  });

  // add the top-right with bottom-left and add the top-left with bottom-right to get the complete length of the diagonal
  // check if the selected move creates a diagonal connect-four
  if (
    Math.max(diagonals[0] + diagonals[2], diagonals[1] + diagonals[3]) + 1 ===
    4
  ) {
    return true;
  }

  // selected move will not result in a win
  return false;
}

/**
 *
 * @param board Current state of the board
 * @param r Row of selected slot
 * @param c Column of selected slot
 * @param turn The current player
 * @returns Board updated with the player's selection
 */
function updateBoard(
  board: number[][],
  r: number,
  c: number,
  turn: number
): number[][] {
  return board.map((row, rowIndex) => {
    // check if the player's selected slot is in the row
    if (rowIndex === r) {
      // iterate the row
      return row.map((col, colIndex) => {
        // check if player's selected slot is in the column
        // the player's selected slot is in the column and row, return the value for the player
        if (colIndex === c) {
          return turn;
        }
        return col;
      });
    }
    // return the original row, selected slot is not in the row
    return row;
  });
}

// create game context
export const GameContext = createContext<ContextType | undefined>(undefined);

// create GameProvider component that will provide children with access to the game context
export const GameProvider: React.FC = ({ children }) => {
  // define state for the board
  const [board, setBoard] = useState<number[][]>(() =>
    // initially, create an empty board
    genEmptyBoard(ROWS, COLS)
  );

  // define state to keep track of the players' turn
  const [turn, setTurn] = useState<typeof P1 | typeof P2>(P1);

  // define state to hold the winning player, by default, set this to 0 indicating that there is no winner
  const [winner, setWinner] = useState<typeof P1 | typeof P2 | 0>(0);

  // define state to hold the selections made by the players
  const [selections, setSelections] = useState<Selection[]>([]);

  /**
   * This function is exposed through the game context object.
   * It willl: check if the move will result in a win, update the board with the
   * selection, track the selection, and update the turn.
   * @param row Row of selected slot
   * @param col Column of selected slot
   */
  function pickSlot(row: number, col: number) {
    // check if this move is a winning move
    if (isWinningMove(board, row, col, turn)) {
      setWinner(turn);
    }
    // update the game board
    setBoard((prevBoard) => updateBoard(prevBoard, row, col, turn));

    // update selections
    setSelections((prevSelections) => [...prevSelections, { turn, row, col }]);

    // update the turn
    setTurn((prevTurn) => {
      if (prevTurn === P1) {
        changeFavicon("🟡");
        return P2;
      } else {
        changeFavicon("🔴");
        return P1;
      }
    });
  }

  /**
   * Helper function to determine whether the game is over or not
   * @returns Whether the game has concluded
   */
  function isOver(): boolean {
    if (winner) return true; // if there is a winner, the game is over
    return selections.length === ROWS * COLS; // if all the slots are selected, then the game is over
  }

  /**
   * Resets the game state
   */
  function reset() {
    // reset the board to an empty board
    setBoard(genEmptyBoard(ROWS, COLS));
    // set the turn back to P1
    setTurn(P1);
    // set the winner to no winner
    setWinner(0);
    // clear selections
    setSelections([]);
  }

  return (
    <GameContext.Provider
      value={{
        board,
        turn,
        pickSlot,
        selections,
        winner,
        isOver,
        reset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

/**
 * Hook to access game context. This hook can only be used within components that are descendents of GameProvider.
 * @returns Game context
 */
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

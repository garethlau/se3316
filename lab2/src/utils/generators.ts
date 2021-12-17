/**
 *
 * @param rows Number of desired rows
 * @param cols Number of desired columns
 * @returns A nested array with default values of 0
 */
export function genEmptyBoard(rows: number, cols: number): number[][] {
  return Array.from(Array(rows)).map(() => Array.from(Array(cols)).fill(0));
}

const generators = {
  genEmptyBoard,
};

export default generators;

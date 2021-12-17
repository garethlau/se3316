import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import Row from "./Row";
import Slot from "./Slot";
import { ROWS, COLS } from "../constants";
import { useGame } from "../contexts/game";
import { genEmptyBoard } from "../utils/generators";

const Board: React.FC = () => {
  const game = useGame(); // access game context

  // create game board to use as skeleton for board layout
  const board = useMemo(() => genEmptyBoard(ROWS, COLS), []);

  return (
    <Box pos="relative" p={2} bg="white" h="100%" w="100%">
      {/* overlay to prevent user interaction on the board once the game is over */}
      {game.isOver() && (
        <Box
          transform="translate(-50%, -50%)"
          top="50%"
          left="50%"
          w="800px"
          h="600px"
          pos="absolute"
        />
      )}
      {/* connect four game board */}
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((_, colIndex) => (
            <Slot key={colIndex} row={rowIndex} col={colIndex} />
          ))}
        </Row>
      ))}
    </Box>
  );
};

export default Board;

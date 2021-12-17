import React from "react";
import { chakra } from "@chakra-ui/react";
import { useGame } from "../contexts/game";

export interface SlotProps {
  row: number;
  col: number;
}

const Slot: React.FC<SlotProps> = ({ row, col }) => {
  const game = useGame(); // access game context
  const name = `slot-r${row}c${col}`; // create name for improved accessibility and HTML semantics
  return (
    <chakra.button
      name={name}
      aria-label={name}
      disabled={game.board[row][col] !== 0}
      _hover={{
        bg: game.turn === 1 ? "red.100" : "yellow.100",
      }}
      _disabled={{
        cursor: "not-allowed",
        bg: game.board[row][col] === 1 ? "red.500" : "yellow.500",
      }}
      bg="black"
      w="64px"
      h="64px"
      borderRadius="100%"
      onClick={() => game.pickSlot(row, col)} // call pickSlot function of game context
      transition="ease 0.3s"
    />
  );
};

export default Slot;

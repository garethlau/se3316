import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useGame } from "../contexts/game";

import { ROWS, COLS, P1, P2 } from "../constants";
const Announcement: React.FC = () => {
  const game = useGame(); // access game context

  const [message, setMessage] = useState<string>("PLAYER 1 TURN");
  const [bg, setBg] = useState<string>("red.500");

  /**
   *
   * @param msg Message to display
   * @param color Background color of the announcement banner
   */
  function setAnnouncement(msg: string, color: string) {
    setMessage(msg);
    setBg(color);
  }

  useEffect(() => {
    // check if the game is over because all the slots are selected
    if (game.selections.length === ROWS * COLS) {
      return setAnnouncement("GAME OVER", "gray.100");
    }

    // check if P1 or P2 has won
    if (game.winner === P1) {
      return setAnnouncement("PLAYER 1 WINS", "green.400");
    }
    if (game.winner === P2) {
      return setAnnouncement("PLAYER 2 WINS", "green.400");
    }

    // display the turn
    if (game.turn === P1) {
      setAnnouncement("PLAYER 1 TURN", "red.500");
    } else if (game.turn === P2) {
      setAnnouncement("PLAYER 2 TURN", "yellow.500");
    }
  }, [game]);

  return (
    <Box bg={bg} p={2} transition="ease 0.2s">
      <Heading textAlign="center">{message}</Heading>
    </Box>
  );
};

export default Announcement;

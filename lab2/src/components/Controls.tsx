import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useGame } from "../contexts/game";

const Controls: React.FC = () => {
  const game = useGame(); // access game context
  return (
    <Flex w="100%" p={2} align="center" justify="center">
      <Button colorScheme="red" onClick={game.reset}>
        Restart Game
      </Button>
    </Flex>
  );
};
export default Controls;

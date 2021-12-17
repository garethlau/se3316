import React from "react";
import Board from "./components/Board";
import { Box, Flex } from "@chakra-ui/react";
import { GameProvider } from "./contexts/game";
import Announcement from "./components/Announcement";
import Controls from "./components/Controls";

const App: React.FC = () => (
  // Wrap in GameProvider so children components can access Game context
  <GameProvider>
    <Flex
      justify="center"
      align="center"
      minW="100vw"
      minH="100vh"
      bg="gray.200"
    >
      <Box>
        <Announcement />
        <Box w="800px" h="600px">
          <Board />
        </Box>
        <Controls />
      </Box>
    </Flex>
  </GameProvider>
);

export default App;

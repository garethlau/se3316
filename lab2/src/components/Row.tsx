import React from "react";
import { Flex } from "@chakra-ui/react";
import { ROWS } from "../constants";

/**
 * This Row component wraps the children and spaces them out evenly.
 * It defines a height and centers the children components vertically.
 */
const Row: React.FC = ({ children }) => (
  <Flex justify="space-around" align="center" h={`calc(100% / ${ROWS})`}>
    {children}
  </Flex>
);

export default Row;

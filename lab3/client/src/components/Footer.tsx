import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FOOTER_HEIGHT } from "../constants";

const Footer: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      w="100vw"
      h={FOOTER_HEIGHT}
      bg="black"
    >
      <Text fontSize="sm" color="white">
        Made by Gareth for SE3316
      </Text>
    </Flex>
  );
};
export default Footer;

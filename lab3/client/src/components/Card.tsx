import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

export type Props = BoxProps & {};

const Card: React.FC<Props> = ({ children, ...rest }) => (
  <Box borderRadius="md" boxShadow="md" p={4} bg="white" {...rest}>
    {children}
  </Box>
);

export default Card;

import { Heading, Stack, Text, Flex, Button } from "@chakra-ui/react";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../constants";
export default function HomePage() {
  return (
    <Flex
      minH={`calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
      bg="gray.50"
      p={6}
      align="center"
      justify="center"
    >
      <Stack textAlign="center">
        <Heading>DOODLE</Heading>
        <Text>Schedule everything with DOODLE</Text>
        <Flex justify="center">
          <Button
            as="a"
            href="/login"
            size="lg"
            mr={2}
            variant="outline"
            colorScheme="blue"
          >
            Log In
          </Button>
          <Button as="a" href="/signup" ml={2} size="lg" colorScheme="blue">
            Sign Up
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

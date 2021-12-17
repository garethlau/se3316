import React, { useState } from "react";
import {
  Box,
  Divider,
  Heading,
  Flex,
  Text,
  Stack,
  Button,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../constants";
import Card from "../components/Card";
import useTimeslots from "../hooks/useTimeslots";
import { DeleteIcon } from "@chakra-ui/icons";

import TimeslotInput from "../components/TimeslotInput";
import useCreatePoll from "../mutations/useCreatePoll";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const { timeslots, add, remove } = useTimeslots();
  const [date, setDate] = useState("");
  const { mutateAsync: createPoll } = useCreatePoll();
  const navigate = useNavigate();
  async function save() {
    try {
      const poll = await createPoll({
        timeslots,
        date,
      });
      navigate(`/poll/${poll.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box
      minH={`calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
      bg="gray.50"
      p={6}
    >
      <Card maxW="600px" mx="auto">
        <Stack spacing={8}>
          <Heading>Create Poll</Heading>
          <Box>
            <Heading as="h2" mb={4} fontSize="1.2rem">
              What date is this for?
            </Heading>
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="December 25, 2021"
            />
          </Box>
          <Box>
            <Heading as="h2" mb={4} fontSize="1.2rem">
              What are the available times?
            </Heading>
            <Stack spacing={4}>
              <TimeslotInput
                onAdd={([startTime, endTime]) => add(startTime, endTime)}
              />
              {timeslots.map(({ start, end, id }) => (
                <React.Fragment key={id}>
                  <Flex align="center" justify="space-between">
                    <Text fontWeight="bold">
                      {start[0]}:{start[1]} - {end[0]}:{end[1]}
                    </Text>
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      aria-label="Remove timeslot"
                      icon={<DeleteIcon />}
                      onClick={() => remove(id)}
                    />
                  </Flex>
                  <Divider />
                </React.Fragment>
              ))}
            </Stack>
          </Box>
          <Button isFullWidth colorScheme="blue" onClick={save}>
            Save
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

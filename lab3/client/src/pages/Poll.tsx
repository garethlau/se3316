import { Box, Flex, Text, Input, Button, Grid } from "@chakra-ui/react";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../constants";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { formatTime, transformTimeslots } from "../utils";
import React, { useState, useEffect } from "react";
import usePoll from "../queries/usePoll";
import { ITimeslot } from "../interfaces";
import useCreateResponse from "../mutations/useCreateResponse";

const HeaderRow: React.FC<{ timeslots: ITimeslot[] }> = ({ timeslots }) => (
  <>
    <Box id="__grid-placeholder" />
    {timeslots.map(({ id, start, end }) => (
      <Box key={id} textAlign="center" bg="gray.100" borderRadius="md" p={2}>
        <Text>{formatTime(...start)}</Text>
        <Text lineHeight="0.5">-</Text>
        <Text>{formatTime(...end)}</Text>
      </Box>
    ))}
  </>
);

const PopulatedRow: React.FC<{
  timeslots: ITimeslot[];
  selected: string[];
  name: string;
}> = ({ timeslots, selected, name }) => {
  return (
    <>
      <Flex align="center" h="64px" p={2}>
        <Text fontWeight="bold">{name}</Text>
      </Flex>
      {timeslots.map(({ id }, index) => (
        <Flex
          align="center"
          justify="center"
          bg={index % 2 === 0 ? "gray.50" : "transparent"}
        >
          <Box
            borderRadius="md"
            id={id}
            transition="ease 0.3s"
            bg={selected.includes(id) ? "green.300" : "gray.200"}
            w="30px"
            h="30px"
          />
        </Flex>
      ))}
    </>
  );
};

const SelectRow: React.FC<{
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  timeslots: ITimeslot[];
  selected: string[];
  handleSelect: (id: string) => void;
}> = ({ name, setName, timeslots, selected, handleSelect }) => {
  return (
    <>
      <Flex align="center" p={2} h="64px">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </Flex>
      {timeslots.map(({ id }, index) => (
        <Flex
          align="center"
          justify="center"
          bg={index % 2 === 0 ? "gray.50" : "transparent"}
        >
          <Box
            borderRadius="md"
            as="button"
            id={id}
            _hover={{ cursor: "pointer" }}
            onClick={() => handleSelect(id)}
            transition="ease 0.3s"
            bg={selected.includes(id) ? "green.300" : "blue.200"}
            w="30px"
            h="30px"
          />
        </Flex>
      ))}
    </>
  );
};

export default function PollPage() {
  const params = useParams();
  const { mutateAsync: createResponse, isLoading: isSaving } =
    useCreateResponse(params.pollId);

  const [name, setName] = useState("");
  const { data: poll, isLoading } = usePoll(params.pollId);
  const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);

  useEffect(() => {
    if (poll) {
      // transform server timeslot datastructure to client side
      setTimeslots(transformTimeslots(poll.timeslots));
    }
  }, [poll]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function handleSelect(id: string) {
    if (selectedIds.includes(id)) {
      // Remove selected timeslot
      setSelectedIds((prev) => prev.filter((s) => s !== id));
    } else {
      // Add selection
      setSelectedIds((prev) => [...prev, id]);
    }
  }

  async function save() {
    try {
      await createResponse({
        selected: selectedIds,
        name,
      });
      setName("");
      setSelectedIds([]);
    } catch (error) {
      console.log(error);
    }
  }

  const templateColumns = `200px repeat(${timeslots.length}, minmax(auto, 64px))`;

  if (isLoading) return <Box>Loading</Box>;
  if (!poll) return <Box>Not found</Box>;
  return (
    <Box
      minH={`calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
      bg="gray.50"
      p={6}
    >
      <Card maxW="960px" mx="auto">
        <Box textAlign="center" mb={6}>
          <Text fontWeight="bold" fontSize="2.5rem" letterSpacing="tight">
            {poll.creator.username}'s Poll
          </Text>
          <Text fontSize="1.2rem">{poll.date}</Text>
        </Box>
        <Box overflow="auto">
          <Grid templateColumns={templateColumns} gap={2}>
            <HeaderRow timeslots={timeslots} />
            {poll.responses.map(
              ({ id, author, timeslots: selectedTimeslots }) => (
                <PopulatedRow
                  key={id}
                  timeslots={timeslots}
                  name={author}
                  selected={selectedTimeslots.map(({ id }) => id)}
                />
              )
            )}
            <SelectRow
              name={name}
              setName={setName}
              timeslots={timeslots}
              selected={selectedIds}
              handleSelect={handleSelect}
            />
          </Grid>
          <Box textAlign="center">
            <Button colorScheme="blue" onClick={save} isLoading={isSaving}>
              Save Selections
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

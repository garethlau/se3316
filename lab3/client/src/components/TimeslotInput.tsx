import React, { useState } from "react";
import {
  Flex,
  IconButton,
  Select,
  Text,
  Spacer,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { HOURS, MINUTES_INTERVALS } from "../constants";

export type Props = {
  onAdd: (timeslot: [[string, string], [string, string]]) => void;
};

const TimeslotInput: React.FC<Props> = ({ onAdd }) => {
  const [[startHour, startMin], setStartTime] = useState<[string, string]>([
    HOURS[0],
    MINUTES_INTERVALS[0],
  ]);
  const [[endHour, endMin], setEndTime] = useState<[string, string]>([
    HOURS[0],
    MINUTES_INTERVALS[0],
  ]);

  const [error, setError] = useState("");

  const handleChange =
    (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      setError("");
      const val = e.target.value;
      if (name === "start-hour") {
        setStartTime((prev) => [val, prev[1]]);
      } else if (name === "start-min") {
        setStartTime((prev) => [prev[0], val]);
      } else if (name === "end-hour") {
        setEndTime((prev) => [val, prev[1]]);
      } else if (name === "end-min") {
        setEndTime((prev) => [prev[0], val]);
      }
    };

  function onClick() {
    if (parseInt(startHour, 10) > parseInt(endHour, 10)) {
      setError("The end time must be after the start time");
      return;
    }
    onAdd([
      [startHour, startMin],
      [endHour, endMin],
    ]);
  }

  return (
    <FormControl isInvalid={!!error}>
      <Flex align="center">
        <Flex align="center">
          <Select
            maxW="80px"
            value={startHour}
            onChange={handleChange("start-hour")}
          >
            {HOURS.map((hour) => (
              <option value={hour}>{hour}</option>
            ))}
          </Select>
          <Text px={2}>:</Text>
          <Select
            maxW="80px"
            value={startMin}
            onChange={handleChange("start-min")}
          >
            {MINUTES_INTERVALS.map((interval) => (
              <option value={interval}>{interval}</option>
            ))}
          </Select>
        </Flex>
        <Text px={2}>-</Text>
        <Flex align="center">
          <Select
            maxW="80px"
            value={endHour}
            onChange={handleChange("end-hour")}
          >
            {HOURS.map((hour) => (
              <option value={hour}>{hour}</option>
            ))}
          </Select>
          <Text px={2}>:</Text>
          <Select maxW="80px" value={endMin} onChange={handleChange("end-min")}>
            {MINUTES_INTERVALS.map((interval) => (
              <option value={interval}>{interval}</option>
            ))}
          </Select>
        </Flex>
        <Spacer />
        <IconButton
          colorScheme="green"
          aria-label="Add timeslot"
          onClick={onClick}
          icon={<AddIcon />}
        />
      </Flex>
      <FormHelperText color="red">{error}</FormHelperText>
    </FormControl>
  );
};

export default TimeslotInput;

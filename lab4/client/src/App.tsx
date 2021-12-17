import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Text,
  Radio,
  RadioGroup,
  Button,
  Alert,
} from "@chakra-ui/react";
import axios from "axios";

type Question = {
  id: string;
  stem: string;
  options: string[];
};

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selections, setSelections] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Fetch list of questions
    axios.get("/api/questions").then((response) => {
      setQuestions(response.data.questions);
    });
  }, []);
  const [score, setScore] = useState<number | null>(null);

  const handleSelection = (id: string) => async (value: string) => {
    setSelections((prev) => ({ ...prev, [id]: value }));
    const response = await axios.post(`/api/questions/${id}`, {
      selection: value,
    });
    setFeedback((prev) => ({ ...prev, [id]: response.data.isCorrect }));
  };

  const onSubmit = async () => {
    const response = await axios.post("/api/questions", {
      selections,
    });
    setScore(response.data.score);
  };

  return (
    <Box p={8}>
      <Stack spacing={6}>
        {questions.map(({ stem, options, id }) => (
          <Box key={stem}>
            <Text>{stem}</Text>
            <RadioGroup onChange={handleSelection(id)}>
              <Stack direction="row">
                {options.map((option) => (
                  <Radio value={option}>{option}</Radio>
                ))}
              </Stack>
            </RadioGroup>
            {feedback[id] !== undefined && (
              <Text color={feedback[id] ? "green.400" : "red.400"}>
                {feedback[id] ? "Correct" : "Incorrect. Try again."}
              </Text>
            )}
          </Box>
        ))}
        <Button
          isDisabled={Object.keys(selections).length < questions.length}
          colorScheme="blue"
          onClick={onSubmit}
        >
          Submit
        </Button>
        {score && (
          <Alert>
            You got {score} correct out of {questions.length}.
          </Alert>
        )}
      </Stack>
    </Box>
  );
}

export default App;

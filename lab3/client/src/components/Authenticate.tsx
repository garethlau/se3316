import {
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  FormLabel,
  Flex,
  Stack,
  Text,
  Link,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import Card from "../components/Card";
import { Formik, Form, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../constants";
import useLogin from "../mutations/useLogin";
import useSignup from "../mutations/useSignup";
import axios from "axios";

export type Props = {
  isLogin: boolean;
};

interface FormValues {
  username: string;
  password: string;
}
const initialValues: FormValues = {
  username: "",
  password: "",
};

const Authenticate: React.FC<Props> = ({ isLogin }) => {
  const { mutateAsync: login } = useLogin();
  const { mutateAsync: signup } = useSignup();
  const toast = useToast();

  const navigate = useNavigate();

  async function onSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) {
    try {
      if (isLogin) {
        // login
        await login(values);
        toast({ status: "success", title: "You've been signed in." });
      } else {
        // signup
        await signup(values);
        toast({ status: "success", title: "You've been signed up." });
      }
      setTimeout(() => navigate("/create"), 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status) {
          // Check if login or signup, status codes will apply to different fields
          if (isLogin) {
            if (error.response.status === 404) {
              // Username DNE
              actions.setErrors({ username: error.response.data.message });
            } else if (error.response.status === 403) {
              // Invalid password
              actions.setErrors({ password: error.response.data.message });
            }
          } else {
            if (error.response.status === 403) {
              // Username already taken
              actions.setErrors({ username: error.response.data.message });
            }
          }
        }
      }
    }
  }
  return (
    <Box
      minH={`calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
      bg="gray.50"
      p={6}
    >
      <Card maxW="450px" mx="auto">
        <Heading textAlign="center">{isLogin ? "Log In" : "Sign Up"}</Heading>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, handleChange, errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.username && touched.username)}
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="ex. GarethMoose"
                  />
                  <FormHelperText color="red.300">
                    {errors.username}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.password && touched.password)}
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="ex. secret"
                  />
                  <FormHelperText color="red.300">
                    {errors.password}
                  </FormHelperText>
                </FormControl>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontSize="sm">
                      {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}{" "}
                      <Link href={isLogin ? "/signup" : "/login"} fontSize="sm">
                        {isLogin ? "Sign up" : "Sign in"}
                      </Link>
                    </Text>
                  </Box>
                  <Button type="submit" colorScheme="blue">
                    {isLogin ? "Log In" : "Sign Up"}
                  </Button>
                </Flex>
              </Stack>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default Authenticate;

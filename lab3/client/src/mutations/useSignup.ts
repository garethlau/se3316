import axios, { AxiosError } from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { setAccessToken } from "../accessToken";

interface Data {
  accessToken: string;
}
interface Values {
  username: string;
  password: string;
}

export default function useSignup(): UseMutationResult<
  Data,
  AxiosError,
  Values
> {
  return useMutation(
    ({ username, password }) =>
      axios
        .post("/api/auth/signup", {
          username,
          password,
        })
        .then((response) => response.data),
    {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
      },
    }
  );
}

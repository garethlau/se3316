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

export default function useLogin(): UseMutationResult<
  Data,
  AxiosError,
  Values
> {
  return useMutation(
    ({ username, password }) =>
      axios
        .post("/api/auth/login", {
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

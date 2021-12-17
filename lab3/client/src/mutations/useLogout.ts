import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { setAccessToken } from "../accessToken";

export default function useLogout() {
  const queryClient = useQueryClient();
  return useMutation(() => axios.get("/api/auth/logout"), {
    onMutate: () => {
      setAccessToken("");
    },
    onSuccess: () => {
      queryClient.setQueryData("user", null);
    },
  });
}

import axios, { AxiosError } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { IPoll } from "../interfaces";

interface Values {
  selected: string[];
  name: string;
}

export default function useCreateResponse(
  pollId: string | undefined | null
): UseMutationResult<IPoll, AxiosError, Values> {
  const queryClient = useQueryClient();
  return useMutation(
    ({ selected, name }) => {
      // Map to remove client side from each timeslot
      return axios
        .post(`/api/polls/${pollId}/responses`, {
          selected,
          name,
        })
        .then((response) => response.data.poll);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["polls", pollId]);
      },
    }
  );
}

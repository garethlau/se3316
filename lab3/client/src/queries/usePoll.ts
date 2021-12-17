import axios, { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { IPoll } from "../interfaces";

export default function usePoll(
  pollId: string | undefined | null
): UseQueryResult<IPoll, AxiosError> {
  return useQuery(
    ["polls", pollId],
    () => {
      return axios.get(`/api/polls/${pollId}`).then((response) => {
        return response.data.poll;
      });
    },
    { enabled: !!pollId }
  );
}

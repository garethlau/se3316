import { AxiosError } from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { IPoll, ITimeslot } from "../interfaces";
import axios from "axios";

interface Values {
  date: string;
  timeslots: ITimeslot[];
}

export default function useCreatePoll(): UseMutationResult<
  IPoll,
  AxiosError,
  Values
> {
  return useMutation(({ date, timeslots }) => {
    const t = timeslots.map(({ start, end }) => ({ start, end }));
    return axios
      .post("/api/polls", {
        date,
        timeslots: t,
      })
      .then((response) => response.data.poll);
  });
}

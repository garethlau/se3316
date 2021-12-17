import { useState } from "react";
import cuid from "cuid";

import { ITimeslot } from "../interfaces";
export default function useTimeslots() {
  const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);

  function add(start: [string, string], end: [string, string]) {
    const id = cuid();
    const newTimeslot = {
      id,
      start,
      end,
    };
    setTimeslots((prev) => [newTimeslot, ...prev]);
  }

  function remove(id: string) {
    const toRemove = id;
    setTimeslots((prev) => prev.filter(({ id }) => id !== toRemove));
  }

  return {
    timeslots,
    add,
    remove,
  };
}

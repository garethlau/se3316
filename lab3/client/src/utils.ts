import { ITimeslot } from "./interfaces";

export function formatTime(hour: string, minute: string) {
  return `${hour}:${minute}`;
}

export function formatTimeslot(
  startTime: [string, string],
  endTime: [string, string]
) {
  return `${formatTime(...startTime)} - ${formatTime(...endTime)}`;
}

export function transformTimeslot(timeslot: {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  id: string;
}): ITimeslot {
  const { startHour, startMinute, endHour, endMinute, id } = timeslot;

  return {
    id,
    start: [
      startHour.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      startMinute.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    ],
    end: [
      endHour.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      endMinute.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    ],
  };
}

export function transformTimeslots(
  timeslots: {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    id: string;
  }[]
): ITimeslot[] {
  return timeslots.map((t) => transformTimeslot(t));
}

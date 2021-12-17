export interface ITimeslot {
  id: string;
  start: [string, string];
  end: [string, string];
}

export interface IPoll {
  id: string;
  date: string;
  timeslots: {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    id: string;
  }[];
  creator: User;
  responses: Response[];
}

export interface Response {
  id: string;
  author: string;
  timeslots: ITimeslot[];
}

export interface User {
  username: string;
}

import axios from "axios";
import { useQuery } from "react-query";

export default function useUser() {
  return useQuery(["user"], () => {
    return axios.get("/api/whoami").then((response) => response.data.user);
  });
}

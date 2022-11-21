import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://82.202.204.94/tmp",
  headers: {
    "Content-Type": "application/json",
  },
});

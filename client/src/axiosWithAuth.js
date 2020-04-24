import axios from "axios";

export default function axiosWithAuth() {
  return axios.create({
    baseURL: "http://localhost:3300/api/",
    headers: {
      Authorization: JSON.parse(window.localStorage.getItem("jokes-token")),
    },
  });
}

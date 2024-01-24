import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
  },
});

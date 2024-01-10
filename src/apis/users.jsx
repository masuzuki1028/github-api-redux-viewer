import axios from "axios";

export const fetchUser = async () => {
  const response = await axios.get(`${process.env.REACT_APP_PUBLIC_URL}/user`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
    },
  });
  return response.data;
};

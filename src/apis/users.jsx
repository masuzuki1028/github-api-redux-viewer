import { instance } from "./api";

export const fetchUser = async () => {
  const response = await instance.get(
    `${process.env.REACT_APP_PUBLIC_URL}/user`
  );
  return response.data;
};

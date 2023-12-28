import axios from "axios";

const URI = "/repos/masuzuki1028/github-api-redux-viewer/"
export const fetchIssues = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_PUBLIC_URL}${URI}issues?state=all`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
      }}
    );
    return response.data;
};


export const closeIssue = async (id) => {
  await axios.patch(
    `${process.env.REACT_APP_PUBLIC_URL}${URI}issues/${id}`, 
    {
      state: "closed",
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
    }
  });
};


export const updateIssue = async (id, status,title,description) => {
  await axios.patch(
    `${process.env.REACT_APP_PUBLIC_URL}${URI}issues/${id}`, 
    {
      state: status === 0 ? "open" : "closed",
      title: title,
      body: description,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
    }
  });
};

export const createIssue = async (title,description) => {
  await axios.post(
    `${process.env.REACT_APP_PUBLIC_URL}${URI}issues`, 
    {
      title: title,
      body: description,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
    }
  });
};

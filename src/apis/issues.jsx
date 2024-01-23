import axios from "axios";
import { toast } from "react-toastify";

const URI = "/repos/masuzuki1028/github-api-redux-viewer/";

const successMSG = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const errorMSG = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const fetchIssues = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_PUBLIC_URL}${URI}issues?state=all`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
      },
    }
  );
  const issues = response.data.filter(issue => !issue.pull_request);
  return issues;
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
      },
    }
  );
};

export const updateIssue = async (id, status, title, description) => {
  try {
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
        },
      }
    );
    successMSG("Issueを更新しました");
  } catch (error) {
    errorMSG("Issueの更新に失敗しました");
  }
};

export const createIssue = async (title, description) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_PUBLIC_URL}${URI}issues`,
      {
        title: title,
        body: description,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
        },
      }
    );
    successMSG("Issueを作成しました");
  } catch (error) {
    errorMSG("Issueの作成に失敗しました");
  }
};

// import axios from "axios";
import { instance } from "./api";
import { toast } from "react-toastify";

const URI = "/repos/masuzuki1028/github-api-redux-viewer/";

const successMSG = (message) => {
  toast.success(message);
};

const errorMSG = (message) => {
  toast.error(message);
};

export const fetchIssues = async () => {
  const response = await instance.get(`${URI}issues?state=all`);
  const issues = response.data.filter((issue) => !issue.pull_request);
  return issues;
};

export const closeIssue = async (id) => {
  await instance.patch(`${URI}issues/${id}`, { state: "closed" });
};

export const updateIssue = async (id, status, title, description) => {
  try {
    await instance.patch(`${URI}issues/${id}`, {
      state: status === 0 ? "open" : "closed",
      title: title,
      body: description,
    });
    successMSG("Issueを更新しました");
  } catch (error) {
    errorMSG("Issueの更新に失敗しました");
  }
};

export const createIssue = async (title, description) => {
  try {
    await instance.post(`${URI}issues`, {
      title: title,
      body: description,
    });
    successMSG("Issueを作成しました");
  } catch (error) {
    errorMSG("Issueの作成に失敗しました");
  }
};

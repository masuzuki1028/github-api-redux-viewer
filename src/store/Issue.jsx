import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const IssueSlice = createSlice({
  name: "Issue",
  initialState,
  reducers: {
    deleteIssue: (state, action) => {
      delete state[action.payload];
    },
    upsertIssue: (state, action) => {
      const id = action.payload.id;
      const {
        title,
        html_url,
        description,
        status,
        createdAt,
        updatedAt,
        user,
      } = action.payload;
      state[id] = {
        id,
        html_url,
        title,
        description,
        status,
        createdAt,
        updatedAt,
        user,
      };
    },
  },
});

export const { deleteIssue, upsertIssue } = IssueSlice.actions;
export default IssueSlice.reducer;

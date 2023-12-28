import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // name: "test",
  // email: "test@example.com",
  // profileUrl:
  //   "https://1.bp.blogspot.com/-tVeC6En4e_E/X96mhDTzJNI/AAAAAAABdBo/jlD_jvZvMuk3qUcNjA_XORrA4w3lhPkdQCNcBGAsYHQ/s1048/onepiece01_luffy.png",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    upsertProfile: (state, action) => {
      const { name, url, profileUrl, following,followers,public_repos,private_repos} = action.payload;
      state.name = name;
      state.url = url;
      state.profileUrl = profileUrl;
      state.follow = following;
      state.followers = followers;
      state.public_repos = public_repos;
      state.private_repos = private_repos;
    }
  },
});

export const {upsertProfile} = profileSlice.actions;
export default profileSlice.reducer;

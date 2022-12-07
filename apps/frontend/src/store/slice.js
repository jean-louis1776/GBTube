import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    accessToken: '',
    id: '',
    isAuth: false,
    nickName: 'Anonymous',
    role: '',
  },
  reducers: reducers
});

export const { setAccessToken, setAuthStatus, setId, setNickName, setRole } = profileSlice.actions;

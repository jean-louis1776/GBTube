import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    accessToken: '',
    id: '0',
    isAuth: false,
    nickName: '',
    role: '',
  },
  reducers: reducers
});

export const { setAccessToken, setAuthStatus, setId, setNickName, setRole } = profileSlice.actions;

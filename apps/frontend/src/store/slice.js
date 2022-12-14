import { createSlice } from '@reduxjs/toolkit';
import { reducers, historyReducers } from './reducer';
export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    accessToken: '',
    id: '0',
    isAuth: false,
    nickName: '',
    role: '',
  },
  reducers: reducers,
});

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    historyList: [],
    searchString: '',
  },
  reducers: historyReducers,
});

export const { setAccessToken, setAuthStatus, setId, setNickName, setRole } =
  profileSlice.actions;
export const { setHistoryList, setSearchString, deleteHistoryItem } =
  historySlice.actions;

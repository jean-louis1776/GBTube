import { createSelector } from 'reselect';

export const getNickName = (store) => store.profileReducer.nickName;

export const getUserId = (store) => store.profileReducer.id;

export const getAuthStatus = (store) => store.profileReducer.isAuth;

export const getAccessToken = (store) => store.profileReducer.accessToken;

export const getRole = (store) => store.profileReducer.role;

export const searchStringSelector = (store) =>
  store.historyReducer.searchString;

export const historyListSelector = createSelector(
  [searchStringSelector, (store) => store.historyReducer.historyList],
  (search, list) => list.filter((item) => item)
);

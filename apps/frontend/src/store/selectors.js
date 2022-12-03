export const getNickName = (store) => store.profileReducer.nickName;

export const getUserId = (store) => store.profileReducer.id;

export const getAuthStatus = (store) => store.profileReducer.isAuth;

export const getAccessToken = (store) => store.profileReducer.accessToken;

export const reducers = {
  setAccessToken(state, action) {
    state.accessToken = action.payload;
  },

  setAuthStatus(state, action) {
    state.isAuth = action.payload;
  },

  setId(state, action) {
    state.id = action.payload;
  },

  setNickName(state, action){
    state.nickName = action.payload;
  },
}

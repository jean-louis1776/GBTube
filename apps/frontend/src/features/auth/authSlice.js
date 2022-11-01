import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: {
		email: '',
		password: '',
		name: '' // результат функции генерации имени
	}
}

export const loginHandler = createAsyncThunk(
	'auth/loginHandler',
	async (userData, { rejectWithValue, dispatch }) => {}
)

export const registrationHandler = createAsyncThunk(
	'auth/registrationHandler',
	async (userData, { rejectWithValue, dispatch }) => {}
)

export const logoutHandler = createAsyncThunk(
	'auth/logoutHandler',
	async (userData, { rejectWithValue, dispatch }) => {}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {}
	},
	extraReducers: {
		[loginHandler.fulfilled]: () => console.log('login: fulfilled'),
		[loginHandler.pending]: () => console.log('login: pending'),
		[loginHandler.rejected]: () => console.log('login: rejected'),
		[registrationHandler.pending]: () => console.log('registration: pending'),
		[registrationHandler.pending]: () => console.log('registration: pending'),
		[registrationHandler.pending]: () => console.log('registration: pending'),
		[logoutHandler.pending]: () => console.log('logout: pending'),
		[logoutHandler.pending]: () => console.log('logout: pending'),
		[logoutHandler.pending]: () => console.log('logout: pending')
	}
})

export default authSlice.reducer

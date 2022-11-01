import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: {}
}

export const userProfileSlice = createSlice({
	name: 'userProfile',
	initialState,
	reducers: {}
})

export const {} = userProfileSlice.actions
export default userProfileSlice.reducer

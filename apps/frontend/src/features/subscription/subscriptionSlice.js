import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	subscribes: []
}

export const subscriptionSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {}
})

export const {} = subscriptionSlice.actions
export default subscriptionSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isTruncate: true
}

export const truncDescriptionSlice = createSlice({
	name: 'truncDescription',
	initialState,
	reducers: {
		truncDescription: state => {
			state.isTruncate = !state.isTruncate
		}
	}
})

export const { truncDescription } = truncDescriptionSlice.actions
export default truncDescriptionSlice.reducer

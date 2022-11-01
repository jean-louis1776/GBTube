import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	channelList: []
}

export const subscribeToChannel = createAsyncThunk(
	'channelList/subscribeToChannel',
	async (channelId, { rejectedWithValue, dispatch }) => {
		// await
		dispatch(subscribeToTargetChannel(channelId))
	}
)

export const unsubscribeFromChannel = createAsyncThunk(
	'channelList/subscribeToChannel',
	async (channelId, { rejectedWithValue, dispatch }) => {
		// await
		dispatch(unsubscribeFromTargetChannel(channelId))
	}
)

export const userChannelListSlice = createSlice({
	name: 'channelList',
	initialState,
	reducers: {
		subscribeToTargetChannel: (state, action) => {
			state.channelList = state.channelList.push(action.payload)
		},
		unsubscribeFromTargetChannel: (state, action) => {
			state.channelList = state.channelList.filter(
				channel => channel.id !== action.payload
			)
		}
	},
	extraReducers: {
		[subscribeToChannel.fulfilled]: () => console.log('sub: fulfilled'),
		[subscribeToChannel.pending]: () => console.log('sub: pending'),
		[subscribeToChannel.rejected]: () => console.log('sub: rejected'),
		[unsubscribeFromChannel.fulfilled]: () => console.log('unsub: fulfilled'),
		[unsubscribeFromChannel.pending]: () => console.log('unsub: pending'),
		[unsubscribeFromChannel.rejected]: () => console.log('unsub: rejected')
	}
})

export const { subscribeToTargetChannel, unsubscribeFromTargetChannel } =
	userChannelListSlice.actions
export default userChannelListSlice.reducer

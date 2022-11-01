import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	video: {}
}

export const uploadVideo = createAsyncThunk(
	'video/uploadVideo',
	async (userVideo, { rejectWithValue, dispatch }) => {
		try {
			const { data } = await VideoController.addVideo(userVideo)
			dispatch(setVideo(data))
		} catch (error) {
			console.log(error)
		}
	}
)

export const getServerVideo = createAsyncThunk(
	'video/getServerVideo',
	async (videoId, { rejectWithValue, dispatch }) => {}
)

export const videoSlice = createSlice({
	name: 'video',
	initialState,
	reducers: {
		setVideo: (state, { payload }) => {
			state.video = payload
		},
		getVideo: () => {}
	}
})

export const { setVideo, getVideo } = videoSlice.actions
export default videoSlice.reducer
